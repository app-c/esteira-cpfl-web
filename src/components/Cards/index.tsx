/* eslint-disable prettier/prettier */
import { IProsEster } from '../../dtos'
import { theme } from '../../theme/theme'
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
  nota: IProsEster
  pres?: () => void
  deletar?: () => void
  submit?: () => void
  buton?: boolean
}

export function Cards({
  nota,
  pres,
  deletar,
  submit,
  buton
}: Props) {
  const numero = String(nota.MO)
  const val = numero.replace(/([0-9]{0})$/g, '.$100')
  const mo = Number(val).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  })
  const equipe = nota.EQUIPE || []
  return (
    <Container>
      <Header>
        <TextNota>{nota.Nota}</TextNota>
      </Header>

      <Text>data: {nota.Dt_programação}</Text>
      <Text>MO: {mo}</Text>
      <Text>Documento: {nota.TLE}</Text>


      {nota.situation !== 'preview' && (
        <div>
          <Text>encarregado: {nota.SUPERVISOR} </Text>
          <Text>equipes: </Text>
          <BoxEquipe>
            {equipe.map((h) => (
              <p style={{color: theme.color.dark[10]}} key={h.id}>{h.equipe}</p>
            ))}
          </BoxEquipe>
          <ContainerButton>
            <Botao pres={submit} title="Enviar" variant="success" />

            {nota.situation === 'estera'  && (
              <Botao pres={pres} title="Editar" variant="secundary" />
            )}

            {nota.situation === 'parcial'  && (
              <Botao pres={pres} title="Editar" variant="secundary" />
            )}
            <Botao pres={deletar} title="Deletar" variant="danger" />
          </ContainerButton>
        </div>
      )}
    </Container>
  )
}
