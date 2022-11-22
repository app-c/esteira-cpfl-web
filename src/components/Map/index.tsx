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
  //   const equi = equipes.length > 0 ? equipes : []
  console.log(equipes)
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

          <Box>
            <Title>{mo}</Title>
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
