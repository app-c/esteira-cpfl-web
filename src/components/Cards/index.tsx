/* eslint-disable prettier/prettier */
import { IProsEster } from '../../dtos'
import { BoxEquipe, Circle, Container, Content, Header } from './styles'

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
    <Container  border={nota.situation} >

      <Content>
        <Header>
          <p>{nota.Nota}</p>
        </Header>

        <div>
          <h5>data: {nota.Dt_programação}</h5>
          <h5>Encarregado: {nota.Dt_programação}</h5>
          <h5>data: {nota.Dt_programação}</h5>
        </div>

        <BoxEquipe>
          <div>
            {equipe.map(h => (
              <p>{h.equipe}</p>
            ))}
          </div>
        </BoxEquipe>
      </Content>

      <Circle />
     
    </Container>
  )
}
