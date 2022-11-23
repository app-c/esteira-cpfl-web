import { IPropsEquipe } from '../../dtos'
import { Box, Container, Content, Line, Title } from './styles'

interface Props {
  nota: string
  data: string
  mo: number
  cidade: string
  tes: string
  equipes: IPropsEquipe[]
  obs: string
  encarregado: string
}

export function Map({
  nota,
  encarregado,
  data,
  mo,
  cidade,
  tes,
  equipes,
  obs,
}: Props) {
  const numero = String(mo)
  const val = numero.replace(/([0-9]{0})$/g, '.$100')
  const valor = Number(val).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <>
      <Container>
        <Content>
          <Box>
            <Title>{nota}</Title>
          </Box>

          <Box>
            <Title>{data}</Title>
          </Box>

          <Box style={{ marginLeft: -2 }}>
            <Title>{valor}</Title>
          </Box>

          <Box>
            <Title>{cidade}</Title>
          </Box>

          <Box>
            <Title>{tes}</Title>
          </Box>

          <Box>
            <Title>{encarregado}</Title>
          </Box>

          <Box>
            {equipes.map((h) => (
              <Title key={h.id}>{h.equipe}</Title>
            ))}
          </Box>

          <Box style={{ width: 800 }}>
            <Title>{obs}</Title>
          </Box>
        </Content>
      </Container>
      <Line style={{ height: 1 }} />
    </>
  )
}
