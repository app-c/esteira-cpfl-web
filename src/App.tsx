import { useState } from 'react'
import { Botao } from './components/Button'
import { Cards } from './components/Cards'
import { Header } from './components/Header'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header />
     <p>ESTEIRA DE PROCESSOS</p>

     <Cards />
     <Botao variant='primary' />
     <Botao variant='success' />
     <Botao variant='danger' />
    </div>
  )
}

