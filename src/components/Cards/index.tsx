import { Container, Header, Text, TextNota } from './styles'

interface Props {
  nota: number
  data: string
  valor: string
  pres: () => void
}

export function Cards({ nota, pres, data, valor }: Props) {
  return (
    <Container onClick={pres}>
      <Header>
        <TextNota>{nota}</TextNota>
      </Header>

      <Text>data: {data}</Text>
      <Text>valor: {valor}</Text>
      <Text>equipes: </Text>
      <Text>obs: </Text>
    </Container>
  )
}
