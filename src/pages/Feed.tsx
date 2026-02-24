import { useState } from 'react'
import { feedInteractions } from '@/lib/mock'
import { ChatSidebar } from '@/components/feed/ChatSidebar'
import { ChatArea } from '@/components/feed/ChatArea'

type FilterType = 'all' | 'active' | 'waiting' | 'scheduled' | 'dismissed'

export default function Feed() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  const filteredFeed = feedInteractions
    .filter((item) => {
      const matchesSearch =
        item.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.treatment.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = activeFilter === 'all' || item.status === activeFilter
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      if (a.status === 'waiting') return -1
      if (b.status === 'waiting') return 1
      if (a.status === 'active') return -1
      if (b.status === 'active') return 1
      return 0
    })

  const selectedInteraction = filteredFeed.find((i) => i.id === selectedChatId) ?? null

  return (
    <div className="flex flex-1 overflow-hidden h-full">
      {/* Left panel — conversation list */}
      <div className="w-[320px] shrink-0 border-r border-slate-200 flex flex-col bg-white overflow-hidden">
        <ChatSidebar
          interactions={filteredFeed}
          selectedId={selectedChatId}
          onSelect={setSelectedChatId}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      {/* Right panel — active conversation */}
      <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
        <ChatArea interaction={selectedInteraction} />
      </div>
    </div>
  )
}