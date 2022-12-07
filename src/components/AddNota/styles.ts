import styled from 'styled-components'
import { theme } from '../../theme/theme'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  align-items: center;
  justify-content: center;
  background: ${theme.color.dark[50]};
`

export const BoxInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: center;

  .boxButon {
    display: flex;
    width: 15rem;
    height: 3rem;
    align-items: center;
    justify-content: space-between;

    margin-top: 30px;
  }
`
