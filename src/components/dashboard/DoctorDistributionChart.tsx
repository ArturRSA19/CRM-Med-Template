import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import { dashboardMetrics } from '@/lib/mock'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

const { doctorDistribution } = dashboardMetrics

const chartConfig = Object.fromEntries(
  doctorDistribution.map((d) => [d.name, { label: d.name, color: d.fill }])
)

const total = doctorDistribution.reduce((sum, d) => sum + d.value, 0)

export function DoctorDistributionChart() {
  return (
    <Card className="shadow-sm h-full">
      <CardHeader>
        <CardTitle>Agendamentos por Doutor</CardTitle>
        <CardDescription>Distribuição gerada pela IA (30 dias)</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 pb-6">
        <ChartContainer config={chartConfig} className="h-[210px] w-full max-w-[220px]">
          <PieChart>
            <Pie
              data={doctorDistribution}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={88}
              paddingAngle={3}
              dataKey="value"
              nameKey="name"
            >
              {doctorDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltipContent hideLabel />} />
          </PieChart>
        </ChartContainer>

        {/* Legend */}
        <div className="flex flex-col gap-2 w-full px-2">
          {doctorDistribution.map((entry) => {
            const pct = Math.round((entry.value / total) * 100)
            return (
              <div key={entry.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ background: entry.fill }}
                  />
                  <span className="text-slate-700 font-medium">{entry.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 text-xs">{entry.value} agend.</span>
                  <span
                    className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
                    style={{ background: entry.fill + '22', color: entry.fill }}
                  >
                    {pct}%
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
