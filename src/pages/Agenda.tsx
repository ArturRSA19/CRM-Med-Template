import { useState, useEffect, type CSSProperties } from 'react'
import { agendaAppointments } from '@/lib/mock'
import type { AgendaAppointment } from '@/lib/mock'
import { AppointmentBlock } from '@/components/agenda/AppointmentBlock'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

// ─── Constants ───────────────────────────────────────────────────────────────
const HOUR_HEIGHT = 64 // px per hour
const DAY_START = 8   // 08:00
const DAY_END = 18    // 18:00
const SLOTS = Array.from({ length: DAY_END - DAY_START }, (_, i) => DAY_START + i)
const DAY_LABELS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB']

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getWeekStart(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - d.getDay())
  return d
}

function getWeekDays(weekStart: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + i)
    return d
  })
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isToday(date: Date): boolean {
  return isSameDay(date, new Date())
}

function getEventStyle(event: AgendaAppointment): CSSProperties {
  const start = new Date(event.startTime)
  const end = new Date(event.endTime)
  const startMin = start.getHours() * 60 + start.getMinutes() - DAY_START * 60
  const durationMin = (end.getTime() - start.getTime()) / 60_000
  const top = (startMin / 60) * HOUR_HEIGHT
  const height = Math.max((durationMin / 60) * HOUR_HEIGHT - 3, 22)
  return { position: 'absolute', top: `${top}px`, height: `${height}px` }
}

function getCurrentTimeTop(now: Date): number {
  return (
    ((now.getHours() * 60 + now.getMinutes() - DAY_START * 60) / 60) *
    HOUR_HEIGHT
  )
}

function formatMonthYear(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function formatHour(h: number): string {
  return `${String(h).padStart(2, '0')}:00`
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function Agenda() {
  const [weekStart, setWeekStart] = useState<Date>(() =>
    getWeekStart(new Date()),
  )
  const [now, setNow] = useState<Date>(new Date())
  const [viewMode, setViewMode] = useState<string>('semana')

  // Update current time every minute
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])

  const weekDays = getWeekDays(weekStart)

  const goToPrev = () =>
    setWeekStart((d) => {
      const n = new Date(d)
      n.setDate(n.getDate() - 7)
      return n
    })

  const goToNext = () =>
    setWeekStart((d) => {
      const n = new Date(d)
      n.setDate(n.getDate() + 7)
      return n
    })

  const goToToday = () => setWeekStart(getWeekStart(new Date()))

  // Month label: derive from the majority of visible days (Wed is safe center)
  const displayMonth = formatMonthYear(weekDays[3])

  // AI count today
  const aiCountToday = agendaAppointments.filter(
    (e) => isSameDay(new Date(e.startTime), new Date()) && e.aiGenerated,
  ).length

  // Current time indicator position
  const timeTop = getCurrentTimeTop(now)
  const timeVisible = timeTop >= 0 && timeTop <= (DAY_END - DAY_START) * HOUR_HEIGHT

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 w-full max-w-7xl mx-auto">
      <div className="flex flex-col gap-4 animate-fade-in w-full">

        {/* ── Top Controls ──────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-2 bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-100">
          {/* Today button */}
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="text-slate-600 border-slate-200 hover:bg-slate-50"
          >
            Hoje
          </Button>

          {/* Week navigation */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrev}
              className="h-8 w-8 text-slate-500 hover:text-slate-800"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="h-8 w-8 text-slate-500 hover:text-slate-800"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Month / Year label */}
          <h2 className="flex-1 text-base font-semibold text-slate-800 capitalize">
            {displayMonth}
          </h2>

          {/* AI count badge */}
          {aiCountToday > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 text-amber-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              {aiCountToday} Agendamento{aiCountToday > 1 ? 's' : ''} da IA Hoje
            </div>
          )}

          {/* View mode selector */}
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-32 h-8 text-sm border-slate-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semana">Semana</SelectItem>
              <SelectItem value="dia">Dia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ── Calendar Grid ─────────────────────────────────────────────── */}
        <Card className="shadow-sm overflow-hidden bg-white border-slate-100">
          <div className="overflow-x-auto">
            <div className="min-w-[640px]">

              {/* Day header row */}
              <div className="flex border-b border-slate-200 bg-slate-50/70">
                {/* Corner cell */}
                <div className="w-[52px] shrink-0 border-r border-slate-200" />

                {weekDays.map((day, i) => {
                  const today = isToday(day)
                  return (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center py-2 gap-0.5"
                    >
                      <span className="text-[10px] font-semibold text-slate-400 tracking-widest">
                        {DAY_LABELS[i]}
                      </span>
                      <span
                        className={`text-sm font-bold leading-none w-7 h-7 flex items-center justify-center rounded-full transition-colors
                          ${today
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-700 hover:bg-slate-100'
                          }`}
                      >
                        {day.getDate()}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* ── Scrollable grid body ──────────────────────────────── */}
              <div className="overflow-y-auto max-h-[560px]">
                <div className="flex" style={{ height: `${(DAY_END - DAY_START) * HOUR_HEIGHT}px` }}>

                  {/* Time column */}
                  <div className="w-[52px] shrink-0 relative border-r border-slate-200">
                    {SLOTS.map((h) => (
                      <div
                        key={h}
                        className="absolute w-full pr-2"
                        style={{ top: `${(h - DAY_START) * HOUR_HEIGHT - 7}px` }}
                      >
                        <span className="text-[10px] text-slate-400 font-medium block text-right leading-none">
                          {formatHour(h)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Day columns */}
                  {weekDays.map((day, colIdx) => {
                    const eventsForDay = agendaAppointments.filter((e) =>
                      isSameDay(new Date(e.startTime), day),
                    )
                    const todayCol = isToday(day)

                    return (
                      <div
                        key={colIdx}
                        className={`flex-1 relative border-r border-slate-200 last:border-r-0 ${todayCol ? 'bg-blue-50/20' : ''}`}
                      >
                        {/* Horizontal hour lines */}
                        {SLOTS.map((h) => (
                          <div
                            key={h}
                            className="absolute left-0 right-0 border-t border-slate-100"
                            style={{ top: `${(h - DAY_START) * HOUR_HEIGHT}px` }}
                          />
                        ))}

                        {/* Half-hour dashed lines */}
                        {SLOTS.map((h) => (
                          <div
                            key={`half-${h}`}
                            className="absolute left-0 right-0 border-t border-dashed border-slate-100/80"
                            style={{
                              top: `${(h - DAY_START) * HOUR_HEIGHT + HOUR_HEIGHT / 2}px`,
                            }}
                          />
                        ))}

                        {/* Current time indicator */}
                        {todayCol && timeVisible && (
                          <div
                            className="absolute left-0 right-0 z-20 flex items-center pointer-events-none"
                            style={{ top: `${timeTop}px` }}
                          >
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0 -ml-1.5 shadow-sm" />
                            <div className="flex-1 h-px bg-red-500 shadow-sm" />
                          </div>
                        )}

                        {/* Events */}
                        {eventsForDay.map((event) => (
                          <AppointmentBlock
                            key={event.id}
                            event={event}
                            style={getEventStyle(event)}
                          />
                        ))}
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* end scrollable body */}

            </div>
          </div>
        </Card>

      </div>
    </div>
  )
}