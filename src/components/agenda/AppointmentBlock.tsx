import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Bot, Clock, CheckCircle2, Stethoscope } from 'lucide-react'
import type { AgendaAppointment } from '@/lib/mock'

type AppointmentBlockProps = {
  event: AgendaAppointment
  style: React.CSSProperties
}

function formatTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

export function AppointmentBlock({ event, style }: AppointmentBlockProps) {
  const startLabel = formatTime(event.startTime)
  const endLabel = formatTime(event.endTime)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`absolute left-0.5 right-0.5 rounded-md text-left cursor-pointer transition-all hover:scale-[1.02] shadow-sm z-10 overflow-hidden flex flex-col p-1.5
            ${
              event.aiGenerated
                ? 'bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.15)] hover:shadow-[0_0_14px_rgba(245,158,11,0.4)]'
                : 'bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          style={style}
        >
          {/* Time + AI icon */}
          <div className="flex items-center justify-between gap-1 leading-none">
            <span className="text-[10px] font-semibold text-slate-500 tabular-nums">
              {startLabel}
            </span>
            {event.aiGenerated && (
              <Bot className="h-3 w-3 text-amber-600 shrink-0" />
            )}
          </div>

          {/* Patient name */}
          <p className="text-xs font-bold text-slate-900 truncate mt-0.5 leading-tight">
            {event.patientName}
          </p>

          {/* Treatment */}
          <p
            className={`text-[10px] truncate leading-tight ${
              event.aiGenerated ? 'text-amber-700 font-medium' : 'text-slate-500'
            }`}
          >
            {event.treatment}
          </p>

          {/* Doctor badge */}
          <div className="mt-auto pt-0.5 flex items-center gap-0.5 opacity-75">
            <Stethoscope className="h-2.5 w-2.5 text-slate-400 shrink-0" />
            <span className="text-[9px] text-slate-400 truncate leading-none">
              {event.doctorName}
            </span>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            {event.aiGenerated ? (
              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200 shadow-none">
                <Bot className="w-3 h-3 mr-1" />
                IA Gerou Agendamento
              </Badge>
            ) : (
              <Badge variant="secondary">Agendamento Manual</Badge>
            )}
          </div>
          <DialogTitle className="text-xl">{event.patientName}</DialogTitle>
          <DialogDescription className="text-base font-medium text-slate-700">
            {event.treatment}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-3">
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Stethoscope className="w-4 h-4 text-slate-400" />
            <span>{event.doctorName}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>
              {startLabel} – {endLabel}
            </span>
          </div>

          {event.aiGenerated && event.details && (
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mt-1">
              <h4 className="flex items-center text-sm font-semibold text-slate-800 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" />
                Como a IA fechou essa venda:
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed italic border-l-2 border-emerald-300 pl-3 ml-1">
                "{event.details}"
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}