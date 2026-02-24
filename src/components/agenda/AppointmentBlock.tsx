import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Bot, Clock, CheckCircle2 } from 'lucide-react'

type AppointmentBlockProps = {
  data: {
    id: string
    patient: string
    time: string
    duration: number
    type: string
    aiGenerated: boolean
    details?: string
    doctor: string
  }
}

export function AppointmentBlock({ data }: AppointmentBlockProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`absolute inset-x-1 p-2 rounded-md text-left cursor-pointer transition-all hover:scale-[1.02] shadow-sm z-10
            ${
              data.aiGenerated
                ? 'bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)] hover:shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                : 'bg-white border border-slate-200 hover:border-slate-300'
            }
          `}
          style={{
            top: '4px',
            height: `calc(${data.duration * 100}% - 8px)`,
          }}
        >
          <div className="flex justify-between items-start mb-1">
            <span className="text-xs font-semibold text-slate-800">
              {data.time}
            </span>
            {data.aiGenerated && <Bot className="h-3.5 w-3.5 text-amber-600" />}
          </div>
          <p className="text-sm font-bold text-slate-900 truncate">
            {data.patient}
          </p>
          <p
            className={`text-xs truncate mt-0.5 ${data.aiGenerated ? 'text-amber-700 font-medium' : 'text-slate-500'}`}
          >
            {data.type}
          </p>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            {data.aiGenerated ? (
              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200 shadow-none">
                <Bot className="w-3 h-3 mr-1" /> IA Gerou Agendamento
              </Badge>
            ) : (
              <Badge variant="secondary">Agendamento Manual</Badge>
            )}
          </div>
          <DialogTitle className="text-xl">{data.patient}</DialogTitle>
          <DialogDescription className="text-base font-medium text-slate-700">
            {data.type} com {data.doctor}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>
              Hoje às {data.time} (Duração: {data.duration}h)
            </span>
          </div>

          {data.aiGenerated && data.details && (
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mt-2">
              <h4 className="flex items-center text-sm font-semibold text-slate-800 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" />
                Como a IA fechou essa venda:
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed italic border-l-2 border-emerald-300 pl-3 ml-1">
                "{data.details}"
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}