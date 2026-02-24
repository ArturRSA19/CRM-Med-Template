import { agendaAppointments } from '@/lib/mock'
import { AppointmentBlock } from '@/components/agenda/AppointmentBlock'
import { Card } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'

const hours = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
]
const doctors = ['Dr. João', 'Dra. Ana']

export default function Agenda() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in w-full">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Agenda da Clínica
          </h2>
          <p className="text-sm text-slate-500">Monitoramento de Horários</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full border border-amber-200 text-amber-700 text-sm font-semibold">
          <Sparkles className="w-4 h-4" />2 Agendamentos da IA Hoje
        </div>
      </div>

      <Card className="shadow-sm overflow-hidden bg-white border-slate-100">
        <div className="overflow-x-auto">
          <div className="min-w-[600px] grid grid-cols-[80px_minmax(0,1fr)_minmax(0,1fr)]">
            <div className="bg-slate-50 border-b border-r border-slate-100 p-3"></div>
            {doctors.map((doc) => (
              <div
                key={doc}
                className="bg-slate-50 border-b border-slate-100 p-3 text-center font-semibold text-slate-700"
              >
                {doc}
              </div>
            ))}

            {hours.map((hour) => (
              <div key={hour} className="contents group">
                <div className="border-b border-r border-slate-100 p-2 text-right">
                  <span className="text-xs font-medium text-slate-400">
                    {hour}
                  </span>
                </div>

                {doctors.map((doc, docIndex) => {
                  const appt = agendaAppointments.find(
                    (a) => a.time === hour && a.doctor === doc,
                  )

                  return (
                    <div
                      key={`${hour}-${doc}`}
                      className={`border-b border-slate-100 relative min-h-[90px] bg-white group-hover:bg-slate-50/30 transition-colors ${docIndex === 0 ? 'border-r' : ''}`}
                    >
                      <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-slate-100"></div>
                      {appt && <AppointmentBlock data={appt} />}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}