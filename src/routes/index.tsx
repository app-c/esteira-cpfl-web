import { Route, Routes } from 'react-router-dom'
import { Execucao } from '../pages/execucao'
import { Home } from '../pages/home'

export function Router() {
  return (
    <Routes>
      <Route path="/planejamento" element={<Home />} />
      <Route path="/execucao" element={<Execucao />} />
    </Routes>
  )
}
