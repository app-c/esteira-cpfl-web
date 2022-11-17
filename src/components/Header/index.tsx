import { Container, ContainerDate, Date, Search, Text } from './styles'

export function Header() {
  return (
    <Container>
      <ContainerDate>
        <Date type="date" />
        <Date type="date" />
      </ContainerDate>
      <Search placeholder="pesquisar nota" />
    </Container>
  )
}
