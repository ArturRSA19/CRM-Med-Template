import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { feedInteractions } from '@/lib/mock'
import { FeedCard } from '@/components/feed/FeedCard'
import { Input } from '@/components/ui/input'
import { Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Feed() {
  const [searchParams] = useSearchParams()
  const highlightId = searchParams.get('id')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFeed = feedInteractions.filter(
    (item) =>
      item.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.treatment.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedFeed = [...filteredFeed].sort((a, b) => {
    if (a.id === highlightId) return -1
    if (b.id === highlightId) return 1
    if (a.status === 'waiting') return -1
    if (b.status === 'waiting') return 1
    return 0
  })

  return (
    <div className="flex flex-col gap-6 animate-fade-in w-full">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por paciente ou tratamento..."
            className="pl-9 bg-slate-50 border-transparent focus-visible:bg-white focus-visible:ring-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            <Filter className="w-4 h-4 mr-2" /> Todos
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="whitespace-nowrap bg-emerald-50 text-emerald-700 border-emerald-200"
          >
            Em Atendimento
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="whitespace-nowrap bg-amber-50 text-amber-700 border-amber-200"
          >
            Aguardando
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sortedFeed.map((interaction) => (
          <FeedCard key={interaction.id} data={interaction} />
        ))}
      </div>
    </div>
  )
}