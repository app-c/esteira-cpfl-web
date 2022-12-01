/* eslint-disable prettier/prettier */
import { IProsEster } from '../../dtos'
import { Botao } from '../Button'
import { BoxEquipe, Container, ContainerButton, Content, Header } from './styles'

interface Props {
  nota: IProsEster
  pres?: () => void
  deletar?: () => void
  submit?: () => void
  buton?: boolean
  title1?: string
  title2?: string
  title3?: string
}

export function Cards({
  nota,
  pres,
  deletar,
  submit,
  buton,
  title1 = 'enviar', title2 = 'editar', title3 = 'deletar'
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

        <div className='texto' >
          <p>{nota.Dt_programação}</p>
          <p>Encarregado: {nota.SUPERVISOR}</p>
          <p>Documento: {nota.TLE}</p>
        </div>

        <BoxEquipe>
            {equipe.map(h => (
              <div key={h.id} >
                <p  >{h.equipe}</p>
              </div>
            ))}
        </BoxEquipe>

        <ContainerButton>
          <Botao pres={submit} title={title1} />
          <Botao pres={pres} title={title2} variant='secundary' />
          <Botao pres={deletar} title={title3} variant='danger' />
        </ContainerButton>
      </Content>

     
    </Container>
  )
}
