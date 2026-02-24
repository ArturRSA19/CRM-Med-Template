import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-slate-700">
    <h1 className="text-6xl font-bold text-slate-300">404</h1>
    <p className="text-lg">Página não encontrada</p>
    <Link to="/" className="text-emerald-600 underline hover:text-emerald-700">
      Voltar para o início
    </Link>
  </div>
)

export default NotFound
