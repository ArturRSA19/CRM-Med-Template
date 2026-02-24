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
import { hotOpportunities } from '@/lib/mock'
import { useNavigate } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'

export function HotOpportunities() {
  const navigate = useNavigate()

  return (
    <Card className="shadow-sm h-full flex flex-col">
      <CardHeader>
        <CardTitle>Oportunidades Quentes</CardTitle>
        <CardDescription>
          Top 5 pacientes próximos ao fechamento hoje
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="pl-6">Paciente</TableHead>
              <TableHead>Tratamento</TableHead>
              <TableHead>Valor Est.</TableHead>
              <TableHead>Status IA</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hotOpportunities.map((op) => (
              <TableRow
                key={op.id}
                className="cursor-pointer hover:bg-slate-50 transition-colors group"
                onClick={() => navigate(`/feed?id=${op.id}`)}
              >
                <TableCell className="pl-6 font-medium text-slate-800 whitespace-nowrap">
                  {op.patient}
                </TableCell>
                <TableCell className="text-slate-600 whitespace-nowrap">
                  {op.treatment}
                </TableCell>
                <TableCell className="font-semibold text-emerald-600 whitespace-nowrap">
                  R$ {op.value.toLocaleString('pt-BR')}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {op.isWaiting && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                      </span>
                    )}
                    <span className="text-sm text-slate-600">{op.status}</span>
                  </div>
                </TableCell>
                <TableCell className="pr-6 text-right">
                  <ExternalLink className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity inline-block" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}