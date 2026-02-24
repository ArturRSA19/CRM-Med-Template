import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageSquareText, HandHelping, Bot, User } from 'lucide-react'
import { mockMessages } from '@/lib/mock'
import { toast } from 'sonner'

type Interaction = {
  id: string
  patient: string
  treatment: string
  status: string
  lastMessage: string
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'active':
      return (
        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none shadow-none text-xs">
          <span className="mr-1.5 relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          IA Conversando
        </Badge>
      )
    case 'waiting':
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none shadow-none text-xs">
          <span className="mr-1.5 relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          Aguardando Humano
        </Badge>
      )
    case 'scheduled':
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none shadow-none text-xs">
          🔵 Agendado
        </Badge>
      )
    case 'dismissed':
      return (
        <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 border-none shadow-none text-xs">
          ⚫ Descartado
        </Badge>
      )
    default:
      return null
  }
}

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-slate-400 p-8">
      <div className="rounded-full bg-slate-100 p-6">
        <MessageSquareText className="w-10 h-10 text-slate-300" />
      </div>
      <div className="text-center">
        <p className="font-semibold text-slate-500">Nenhuma conversa selecionada</p>
        <p className="text-sm mt-1">Selecione uma conversa ao lado para visualizar.</p>
      </div>
    </div>
  )
}

type ChatAreaProps = {
  interaction: Interaction | null
}

export function ChatArea({ interaction }: ChatAreaProps) {
  if (!interaction) {
    return (
      <div className="flex flex-1 flex-col h-full">
        <EmptyState />
      </div>
    )
  }

  const messages = mockMessages[interaction.id] ?? []
  const isAiInControl = interaction.status !== 'waiting'

  const handleTakeOver = () => {
    toast.success('Conversa assumida!', {
      description: `Você assumiu a conversa com ${interaction.patient}.`,
    })
    console.log('Assumir conversa:', interaction.id)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between gap-4 px-5 py-3 border-b border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-bold text-slate-800 text-base leading-tight">
              {interaction.patient}
            </h2>
            <StatusBadge status={interaction.status} />
          </div>
          <p className="text-xs font-medium text-blue-600 mt-0.5">{interaction.treatment}</p>
        </div>
        <Button
          size="sm"
          variant={interaction.status === 'waiting' ? 'default' : 'outline'}
          className={
            interaction.status === 'waiting'
              ? 'shrink-0 bg-amber-500 hover:bg-amber-600 text-white border-none'
              : 'shrink-0'
          }
          onClick={handleTakeOver}
        >
          <HandHelping className="w-4 h-4 mr-1.5" />
          Assumir Conversa
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
        {messages.map((msg, idx) => {
          const isAi = msg.role === 'ai'
          return (
            <div
              key={idx}
              className={`flex items-end gap-2 ${isAi ? 'justify-end' : 'justify-start'}`}
            >
              {!isAi && (
                <div className="shrink-0 rounded-full bg-slate-200 p-1.5 mb-0.5">
                  <User className="w-3.5 h-3.5 text-slate-600" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                  isAi
                    ? 'bg-emerald-600 text-white rounded-br-sm'
                    : 'bg-white text-slate-700 rounded-bl-sm border border-slate-200'
                }`}
              >
                {msg.text}
              </div>
              {isAi && (
                <div className="shrink-0 rounded-full bg-emerald-100 p-1.5 mb-0.5">
                  <Bot className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="shrink-0 px-4 py-3 border-t border-slate-200 bg-white">
        {isAiInControl ? (
          <div className="relative">
            <Bot className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              disabled
              placeholder="A IA está no controle da conversa..."
              className="pl-9 bg-slate-50 text-slate-400 cursor-not-allowed border-slate-200"
            />
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-slate-50 border-slate-200 focus-visible:bg-white"
            />
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4">
              Enviar
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
