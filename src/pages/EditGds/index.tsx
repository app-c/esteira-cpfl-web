import React, { useContext } from 'react'
import { NotasContext } from '../../context/ListNotas'
import { BoxGds, Container, Content, HeaderContent } from './styles'

export function EditGds() {
  const { GDS } = useContext(NotasContext)
  React.useEffect(() => {
    console.log('okdsflkjdsfkj')
  }, [])

  const eqp = GDS.filter((i) => {
    if (
      i.equipe !== 'ALMOXARIFADO' &&
      i.equipe !== 'MONTADOR' &&
      i.equipe !== 'VIABILIDADE'
    ) {
      return i
    }
  })

  return (
    <Container>
      <BoxGds>
        {eqp.map((i) => (
          <Content key={i.equipe}>
            <HeaderContent>
              <p>{i.equipe}</p>
            </HeaderContent>
            {i.dados.map((h) => (
              <div key={h.nome}>
                <div style={{ display: 'flex' }}>
                  <p>{h.nome.toLowerCase()};</p>
                </div>
              </div>
            ))}
          </Content>
        ))}
      </BoxGds>
    </Container>
  )
}
