import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Babas, Login } from './pages'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/entrar" element={<Login />} />
        <Route path="/" element={<Babas />} />
      </Routes>
    </BrowserRouter>
  )
}
