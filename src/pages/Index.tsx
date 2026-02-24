import { KPIStats } from '@/components/dashboard/KPIStats'
import { FunnelChart } from '@/components/dashboard/FunnelChart'
import { HotOpportunities } from '@/components/dashboard/HotOpportunities'

export default function Index() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in-up w-full">
      <KPIStats />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <FunnelChart />
        </div>
        <div className="lg:col-span-2">
          <HotOpportunities />
        </div>
      </div>
    </div>
  )
}