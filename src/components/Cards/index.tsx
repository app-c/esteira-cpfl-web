import { Container, Header, Text, TextNota } from './styles'

interface Props {
  nota: number
  data: string
  valor: string
}

export function Cards({ nota, data, valor }: Props) {
  return (
    <Container>
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
