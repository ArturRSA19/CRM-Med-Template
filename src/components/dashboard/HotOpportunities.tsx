import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { hotOpportunities, type AiStatus } from '@/lib/mock'
import { useNavigate } from 'react-router-dom'
import { ExternalLink, UserCircle2 } from 'lucide-react'

type StatusConfig = {
  label: string
  className: string
  dot?: boolean
}

const statusConfig: Record<AiStatus, StatusConfig> = {
  'Pronto para Agendar': {
    label: 'Pronto para Agendar',
    className: 'bg-emerald-100 text-emerald-700 border-0 hover:bg-emerald-100',
  },
  'Negociando Valores': {
    label: 'Negociando Valores',
    className: 'bg-amber-100 text-amber-700 border-0 hover:bg-amber-100',
  },
  'Aguardando Humano': {
    label: 'Aguardando Humano',
    className: 'bg-orange-100 text-orange-700 border-0 hover:bg-orange-100',
    dot: true,
  },
  'Agendamento Confirmado': {
    label: 'Agendamento Confirmado',
    className: 'bg-blue-100 text-blue-700 border-0 hover:bg-blue-100',
  },
}

export function HotOpportunities() {
  const navigate = useNavigate()

  return (
    <Card className="shadow-sm h-full flex flex-col">
      <CardHeader>
        <CardTitle>Oportunidades Quentes</CardTitle>
        <CardDescription>
          Top 5 leads mais próximos do fechamento hoje
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="pl-6">Lead / Paciente</TableHead>
              <TableHead>Tratamento de Interesse</TableHead>
              <TableHead>Doutor Alocado</TableHead>
              <TableHead>Faturamento Previsto</TableHead>
              <TableHead>Status da IA</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hotOpportunities.map((op) => {
              const cfg = statusConfig[op.aiStatus]
              return (
                <TableRow
                  key={op.id}
                  className="cursor-pointer hover:bg-slate-50 transition-colors group"
                  onClick={() => navigate(`/feed?id=${op.id}`)}
                >
                  <TableCell className="pl-6 font-medium text-slate-800 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <UserCircle2 className="h-4 w-4 text-slate-400 shrink-0" />
                      {op.patient}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600 whitespace-nowrap">
                    {op.treatment}
                  </TableCell>
                  <TableCell className="text-slate-600 whitespace-nowrap">
                    {op.doctor ?? <span className="text-slate-400 italic">—</span>}
                  </TableCell>
                  <TableCell className="font-semibold text-emerald-600 whitespace-nowrap">
                    R$ {op.estimatedRevenue.toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {cfg.dot && (
                        <span className="relative flex h-2 w-2 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                      )}
                      <Badge className={`text-xs font-medium ${cfg.className}`}>
                        {cfg.label}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <ExternalLink className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity inline-block" />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}