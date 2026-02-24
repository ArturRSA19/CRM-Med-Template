import { useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Search, Filter, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type Interaction = {
  id: string
  patient: string
  treatment: string
  status: string
  lastMessage: string
}

type FilterType = 'all' | 'active' | 'waiting' | 'scheduled' | 'dismissed'

const FILTER_OPTIONS: { value: Exclude<FilterType, 'all'>; label: string; dot: string; bg: string; text: string }[] = [
  { value: 'waiting',   label: 'Aguardando Humano', dot: 'bg-amber-400',   bg: 'hover:bg-amber-50',   text: 'text-amber-800' },
  { value: 'active',    label: 'IA Conversando',    dot: 'bg-emerald-400', bg: 'hover:bg-emerald-50', text: 'text-emerald-800' },
  { value: 'scheduled', label: 'Agendado',          dot: 'bg-blue-400',    bg: 'hover:bg-blue-50',    text: 'text-blue-800' },
  { value: 'dismissed', label: 'Descartado',        dot: 'bg-slate-400',   bg: 'hover:bg-slate-100',  text: 'text-slate-600' },
]

type ChatSidebarProps = {
  interactions: Interaction[]
  selectedId: string | null
  onSelect: (id: string) => void
  searchTerm: string
  onSearchChange: (value: string) => void
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

function StatusDot({ status }: { status: string }) {
  if (status === 'active') {
    return (
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
      </span>
    )
  }
  if (status === 'waiting') {
    return (
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
      </span>
    )
  }
  if (status === 'scheduled') {
    return <span className="inline-flex rounded-full h-2.5 w-2.5 bg-blue-400 shrink-0" />
  }
  return <span className="inline-flex rounded-full h-2.5 w-2.5 bg-slate-300 shrink-0" />
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function getLastMessageSnippet(lastMessage: string) {
  const lines = lastMessage.split('\n')
  const last = lines[lines.length - 1]
  return last.replace(/^(IA|Paciente):/, '').trim()
}

export function ChatSidebar({
  interactions,
  selectedId,
  onSelect,
  searchTerm,
  onSearchChange,
  activeFilter,
  onFilterChange,
}: ChatSidebarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const activeOption = FILTER_OPTIONS.find((o) => o.value === activeFilter)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-slate-100 bg-white space-y-3 shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por paciente..."
            className="pl-9 bg-slate-50 border-transparent focus-visible:bg-white focus-visible:ring-1 text-sm"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="flex gap-1.5">
          {/* Todos */}
          <Button
            variant={activeFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            className={cn(
              'whitespace-nowrap text-xs h-7 px-2.5',
              activeFilter === 'all' && 'bg-slate-800 text-white hover:bg-slate-700',
            )}
            onClick={() => {
              onFilterChange('all')
              setDropdownOpen(false)
            }}
          >
            Todos
          </Button>

          {/* Filtro dropdown */}
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                'whitespace-nowrap text-xs h-7 px-2.5 gap-1',
                activeFilter !== 'all' && activeOption && `${activeOption.text} border-current`,
              )}
              onClick={() => setDropdownOpen((v) => !v)}
            >
              {activeFilter !== 'all' && activeOption ? (
                <>
                  <span className={cn('inline-flex rounded-full h-2 w-2 shrink-0', activeOption.dot)} />
                  {activeOption.label}
                </>
              ) : (
                <>
                  <Filter className="w-3 h-3" />
                  Filtro
                </>
              )}
              <ChevronDown className={cn('w-3 h-3 transition-transform', dropdownOpen && 'rotate-180')} />
            </Button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-1 z-50 w-48 rounded-lg border border-slate-200 bg-white shadow-lg py-1">
                {FILTER_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      onFilterChange(opt.value)
                      setDropdownOpen(false)
                    }}
                    className={cn(
                      'w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-left transition-colors',
                      opt.bg,
                      opt.text,
                      activeFilter === opt.value && 'font-semibold',
                    )}
                  >
                    <span className={cn('inline-flex rounded-full h-2.5 w-2.5 shrink-0', opt.dot)} />
                    {opt.label}
                    {activeFilter === opt.value && (
                      <span className="ml-auto text-[10px] opacity-60">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {interactions.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 text-sm gap-2 p-6">
            <Search className="w-8 h-8 opacity-40" />
            <p>Nenhuma conversa encontrada.</p>
          </div>
        )}
        {interactions.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={cn(
              'w-full text-left flex items-start gap-3 px-4 py-3 border-b border-slate-100 hover:bg-slate-50 transition-colors',
              selectedId === item.id && 'bg-slate-100 hover:bg-slate-100',
              item.status === 'waiting' && 'border-l-2 border-l-amber-400',
            )}
          >
            <Avatar className="h-10 w-10 shrink-0 mt-0.5">
              <AvatarFallback className="text-xs font-semibold bg-slate-200 text-slate-700">
                {getInitials(item.patient)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className="font-semibold text-sm text-slate-800 truncate">
                  {item.patient}
                </span>
                <StatusDot status={item.status} />
              </div>
              <p className="text-xs font-medium text-blue-600 mb-1 truncate">{item.treatment}</p>
              <p className="text-xs text-slate-500 truncate leading-tight">
                {getLastMessageSnippet(item.lastMessage)}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
