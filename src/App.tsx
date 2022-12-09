import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { NotasProvider } from './context/ListNotas'
import { Router } from './routes'
import { GlobalStyle } from './theme/global'
import { theme } from './theme/theme'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <NotasProvider>
        <BrowserRouter>
          <div style={{ flex: 1 }}>
            <Router />
          </div>
        </BrowserRouter>
      </NotasProvider>

      <GlobalStyle />
    </ThemeProvider>
  )
}
