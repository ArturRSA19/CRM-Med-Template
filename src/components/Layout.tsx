import { Link, Outlet, useLocation } from 'react-router-dom'
import { Wallet, Activity, Calendar, Settings, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToast } from '@/hooks/use-toast'
import { useEffect } from 'react'

const navItems = [
  { name: 'Cofre de ROI', path: '/', icon: Wallet },
  { name: 'Live Feed', path: '/feed', icon: Activity },
  { name: 'Agenda', path: '/agenda', icon: Calendar },
]

export default function Layout() {
  const location = useLocation()
  const { toast } = useToast()

  useEffect(() => {
    const timer1 = setTimeout(() => {
      toast({
        title: '✨ Novo agendamento!',
        description: 'A IA acaba de agendar uma avaliação para Roberto Alves.',
        className: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      })
    }, 4000)

    const timer2 = setTimeout(() => {
      toast({
        title: '💰 Fechamento iminente',
        description:
          'Paciente Maria Silva solicitou link de pagamento para Implante.',
        className: 'bg-amber-50 border-amber-200 text-amber-900',
      })
    }, 15000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [toast])

  const getPageTitle = () => {
    const route = navItems.find((item) => item.path === location.pathname)
    return route ? route.name : 'Motor de Lucro'
  }

  return (
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-900">
      <aside className="hidden w-64 flex-col border-r bg-white md:flex fixed inset-y-0 z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="flex h-16 items-center px-6 border-b border-slate-100">
          <Sparkles className="h-6 w-6 text-emerald-500 mr-2" />
          <span className="font-bold text-lg tracking-tight">MotorOdonto</span>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-slate-100',
                  isActive
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-600',
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="border-t border-slate-100 p-4 flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1" />
            <AvatarFallback>DR</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">Dr. Admin</p>
            <p className="text-xs text-slate-500 truncate">Super Admin</p>
          </div>
          <Settings className="h-4 w-4 text-slate-400 cursor-pointer hover:text-slate-700" />
        </div>
      </aside>

      <div className="flex flex-1 flex-col md:pl-64 mb-16 md:mb-0 w-full">
        <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-100 bg-white/80 px-4 backdrop-blur-md md:px-6">
          <h1 className="text-xl font-bold text-slate-800">{getPageTitle()}</h1>
          <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full border shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-semibold text-slate-700">
              12 IAs Ativas
            </span>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 w-full max-w-7xl mx-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      <nav className="fixed bottom-0 z-50 flex h-[calc(4rem+env(safe-area-inset-bottom))] w-full items-center justify-around border-t bg-white md:hidden pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center gap-1 w-full h-full pt-1',
                isActive ? 'text-emerald-600' : 'text-slate-500',
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}