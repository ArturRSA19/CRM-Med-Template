import { Bar, BarChart, Cell, XAxis, YAxis, Tooltip } from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import { pipelineData } from '@/lib/mock'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

const chartConfig = {
  count: { label: 'Pacientes' },
  Contatos: { color: 'hsl(var(--chart-1))' },
  Abordados: { color: 'hsl(var(--chart-2))' },
  Negociação: { color: 'hsl(var(--chart-3))' },
  Agendados: { color: 'hsl(var(--chart-4))' },
}

export function FunnelChart() {
  return (
    <Card className="shadow-sm h-full">
      <CardHeader>
        <CardTitle>Funil de Reativação</CardTitle>
        <CardDescription>Fluxo da IA nos últimos 14 dias</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart
            data={pipelineData}
            layout="vertical"
            margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
          >
            <XAxis type="number" hide />
            <YAxis
              dataKey="stage"
              type="category"
              axisLine={false}
              tickLine={false}
              width={100}
              className="text-xs font-medium"
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={32}>
              {pipelineData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}