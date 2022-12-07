/* eslint-disable prettier/prettier */
import { IProsEster } from '../../dtos'
import { Botao } from '../Button'
import { BoxEquipe, Container, ContainerButton, Content, Header } from './styles'
      
import { IconContext } from 'react-icons'
import { FaBeer } from 'react-icons/fa'

interface Props {
  nota: IProsEster
  pres?: () => void
  deletar?: () => void
  submit?: () => void
  buton?: boolean
  title1?: string
  title2?: string
  title3?: string
  colorSituation?: string
  sigleSituation?: string
}

export function Cards({
  nota, colorSituation = '#7c8a7f', sigleSituation,
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
    <IconContext.Provider value={{color: 'blue',}} >

      <Container borderC={nota.situation} >

        <Content>
          <Header color={colorSituation} >
            <p>{nota.Nota}</p>
            <FaBeer />
            <h6>{sigleSituation}</h6>
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

          {nota.situation === 'estera' && (
            <ContainerButton>
              <Botao pres={deletar} title={title3} variant='danger' />
              <Botao pres={pres} title={title2} variant='secundary' />
              <Botao pres={submit} title={title1} />
            </ContainerButton>

          )}

          {nota.situation === 'processo' && (
            <ContainerButton>
              <Botao pres={pres} title={title2} variant='secundary' />
              <Botao pres={submit} title={title1} />
            </ContainerButton>
          )}
          
          {nota.situation === 'executada' && (
            <ContainerButton>
              <Botao pres={pres} title={title2} variant='secundary' />
            </ContainerButton>
          )}

          {nota.situation === 'parcial' && (
            <ContainerButton>
              <Botao pres={pres} title={title2} variant='secundary' />
              <Botao pres={submit} title={title1} variant='primary' />
            </ContainerButton>
          )}

          {nota.situation === 'cancelada' && (
            <ContainerButton>
              <Botao pres={pres} title={title2} variant='secundary' />
            </ContainerButton>
          )}

        </Content>

      
      </Container>
    </IconContext.Provider>
  )
}
