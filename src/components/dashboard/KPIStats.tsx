import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Users, CalendarCheck, Clock } from 'lucide-react'
import { dashboardMetrics } from '@/lib/mock'

const { kpis } = dashboardMetrics

export function KPIStats() {
  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {/* Faturamento Gerado pela IA */}
      <Card className="col-span-2 sm:col-span-1 border-emerald-100 shadow-sm bg-gradient-to-br from-emerald-50/60 to-white hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-emerald-800">
            Faturamento Gerado pela IA
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-emerald-600 shrink-0" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-emerald-600">
            R$ {kpis.revenueAI.toLocaleString('pt-BR')}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold px-2 py-0.5 rounded-full border-0">
              +{kpis.revenueGrowthPercent}%
            </Badge>
            <span className="text-xs text-slate-500">vs. mês anterior</span>
          </div>
        </CardContent>
      </Card>

      {/* Leads Qualificados */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">
            Leads Qualificados
          </CardTitle>
          <Users className="h-4 w-4 text-blue-500 shrink-0" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-slate-800">
            {kpis.leadsQualified.toLocaleString('pt-BR')}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Atendidos e convertidos pela IA
          </p>
        </CardContent>
      </Card>

      {/* Agendamentos Realizados */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">
            Agendamentos Realizados
          </CardTitle>
          <CalendarCheck className="h-4 w-4 text-violet-500 shrink-0" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-slate-800">
            {kpis.appointmentsBooked.toLocaleString('pt-BR')}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Consultas marcadas pela IA
          </p>
        </CardContent>
      </Card>

      {/* Tempo Salvo */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">
            Tempo Salvo da Equipe
          </CardTitle>
          <Clock className="h-4 w-4 text-amber-500 shrink-0" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-slate-800">
            {kpis.timeSavedHours}h
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Atendimento humano evitado
          </p>
        </CardContent>
      </Card>
    </div>
  )
}