import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './theme/global'
import { theme } from './theme/theme'
import { Home } from './pages/home'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Home />
      </div>

      <GlobalStyle />
    </ThemeProvider>
  )
}
