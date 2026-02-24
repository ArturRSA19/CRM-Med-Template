import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Activity, Percent } from 'lucide-react'
import { kpiData } from '@/lib/mock'

export function KPIStats() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="border-emerald-100 shadow-sm bg-gradient-to-br from-emerald-50/50 to-white hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-emerald-800">
            R$ Recuperados (14d)
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-emerald-600">
            R$ {kpiData.recovered.toLocaleString('pt-BR')}
          </div>
          <p className="text-xs text-emerald-600/80 mt-1">
            +12% vs período anterior
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">
            Pipeline Ativo
          </CardTitle>
          <Activity className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-slate-800">
            R$ {kpiData.pipeline.toLocaleString('pt-BR')}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Estimativa de fechamento
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">
            Taxa de Reativação
          </CardTitle>
          <Percent className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-slate-800">
            {kpiData.rate}%
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Conversão de contatos frios
          </p>
        </CardContent>
      </Card>
    </div>
  )
}