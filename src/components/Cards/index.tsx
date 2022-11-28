/* eslint-disable prettier/prettier */
import { IPropsEquipe } from '../../dtos'
import { Botao } from '../Button'
import {
  BoxEquipe,
  Container,
  ContainerButton,
  Header,
  Text,
  TextNota
} from './styles'

interface Props {
  nota: string
  data: string
  valor: number
  pres?: () => void
  deletar?: () => void
  submit?: () => void
  equipe: IPropsEquipe[]
}

export function Cards({
  nota,
  pres,
  data,
  valor,
  deletar,
  submit,
  equipe = [],
}: Props) {
  const numero = String(valor)
  const val = numero.replace(/([0-9]{0})$/g, '.$100')
  const mo = Number(val).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  })
  return (
    <Container>
      <Header>
        <TextNota>{nota}</TextNota>
      </Header>

      <Text>data: {data}</Text>
      <Text>MO: {mo}</Text>
      <Text>equipes: </Text>
      <BoxEquipe>
        {equipe.map((h) => (
          <p key={h.id}>{h.equipe}</p>
        ))}
      </BoxEquipe>
      <ContainerButton>
        <Botao pres={submit} title="Enviar" variant="success" />
        <Botao pres={pres} title="Editar" variant="secundary" />
        <Botao pres={deletar} title="Deletar" variant="danger" />
      </ContainerButton>
    </Container>
  )
}
