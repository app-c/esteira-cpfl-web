import React from 'react'
import { BoxGd, Container, Content } from './styles'

export function BoxGds() {
  React.useEffect(() => {
    console.log('ok')
  }, [])

  return (
    <Container>
      <BoxGd>
        <Content>
          <p>gd</p>
          <p>gd</p>
          <p>gd</p>
          <p>gd</p>
        </Content>
      </BoxGd>
    </Container>
  )
}
