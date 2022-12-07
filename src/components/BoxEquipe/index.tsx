import { theme } from '../../theme/theme'
import { Container } from './styles'

interface Props {
  select: boolean
  pres: () => void
  eqp: string
  us: number
}

// select.findIndex((i) => i.id === h.id) !== -1
// ? theme.color.green[10]
// : '#e2e2e2',
// }}

export function BoxEquipe({ select = false, eqp, pres, us = 0 }: Props) {
  return (
    <Container>
      <button
        style={{
          background: select ? theme.color.green[10] : theme.color.white[50],
        }}
        type="submit"
        onClick={pres}
      >
        <header>
          <h4>{eqp}</h4>
        </header>
        <p>Meta Us: 24</p>
        <p>Orçado: {us}</p>
      </button>
    </Container>
  )
}
