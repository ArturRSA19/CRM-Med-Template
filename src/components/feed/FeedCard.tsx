import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MessageSquareText, HandHelping } from 'lucide-react'

type FeedCardProps = {
  data: {
    id: string
    patient: string
    treatment: string
    status: string
    lastMessage: string
  }
}

export function FeedCard({ data }: FeedCardProps) {
  const getStatusBadge = () => {
    switch (data.status) {
      case 'active':
        return (
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none shadow-none">
            <span className="mr-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>{' '}
            IA Conversando
          </Badge>
        )
      case 'waiting':
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none shadow-none">
            <span className="mr-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>{' '}
            Aguardando Humano
          </Badge>
        )
      case 'scheduled':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none shadow-none">
            🔵 Agendado
          </Badge>
        )
      case 'dismissed':
        return (
          <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 border-none shadow-none">
            ⚫ Descartado
          </Badge>
        )
      default:
        return null
    }
  }

  const isCritical = data.status === 'waiting' || data.status === 'active'

  return (
    <Card
      className={`flex flex-col h-full shadow-sm hover:shadow-md transition-all hover:-translate-y-1 ${isCritical ? 'border-l-4 border-l-emerald-500' : ''}`}
    >
      <CardHeader className="pb-3 flex flex-row items-start justify-between">
        <div>
          <h3 className="font-bold text-lg text-slate-800">{data.patient}</h3>
          <p className="text-sm font-medium text-blue-600">{data.treatment}</p>
        </div>
        {getStatusBadge()}
      </CardHeader>
      <CardContent className="flex-1">
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm text-slate-700 whitespace-pre-wrap flex gap-3">
          <MessageSquareText className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed font-mono text-[13px]">
            {data.lastMessage}
          </p>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button
          variant={data.status === 'waiting' ? 'default' : 'outline'}
          className={`w-full ${data.status === 'waiting' ? 'bg-amber-500 hover:bg-amber-600 text-white border-none' : ''}`}
        >
          <HandHelping className="w-4 h-4 mr-2" />
          Assumir Conversa Manualmente
        </Button>
      </CardFooter>
    </Card>
  )
}