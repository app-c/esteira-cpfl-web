import { Route, Routes } from 'react-router-dom'
import { Execucao } from '../pages/execucao'
import { Home } from '../pages/home'
import { Login } from '../pages/login'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Execucao />} />
      <Route path="/planejamento" element={<Home />} />
      <Route path="/loging" element={<Login />} />
    </Routes>
  )
}
