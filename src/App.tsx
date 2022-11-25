import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './theme/global'
import { theme } from './theme/theme'
import { Home } from './pages/home'
import { NotasProvider } from './context/ListNotas'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <NotasProvider>
        <div className="App">
          <Home />
        </div>
      </NotasProvider>

      <GlobalStyle />
    </ThemeProvider>
  )
}
