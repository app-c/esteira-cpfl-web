import { useCallback, useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { Botao } from './components/Button'
import { Cards } from './components/Cards'
import { Header } from './components/Header'
import { GlobalStyle } from './theme/global'
import { theme } from './theme/theme'
import { onSnapshot, collection } from 'firebase/firestore'
import { fire } from './config/firebase'
import { motion } from 'framer-motion'
import { Home } from './pages/home'

export function App() {
  const [notas, setNotas] = useState<[]>([])

  const submit = useCallback(() => {
    console.log('ok', 'bla')
  }, [])

  const db = collection(fire, 'notas')
  useEffect(() => {
    onSnapshot(db, (h) => {
      setNotas(h.docs.map((p) => p.data()))
    })
  }, [db])

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Home />
      </div>

      <GlobalStyle />
    </ThemeProvider>
  )
}
