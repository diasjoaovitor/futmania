import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Babas, Finances, Login, Members, Stats } from './pages'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/entrar" element={<Login />} />
        <Route path="/" element={<Babas />} />
        <Route path="/estatisticas" element={<Stats />} />
        <Route path="/membros" element={<Members />} />
        <Route path="/financas" element={<Finances />} />
      </Routes>
    </BrowserRouter>
  )
}
