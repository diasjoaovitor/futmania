import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Babas, Finances, Login, Members, Stats } from './pages'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/" element={<Babas />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/members" element={<Members />} />
        <Route path="/finances" element={<Finances />} />
      </Routes>
    </BrowserRouter>
  )
}
