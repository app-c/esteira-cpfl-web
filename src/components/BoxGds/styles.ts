import styled from 'styled-components'
import { theme } from '../../theme/theme'

export const Container = styled.div`
  display: flex;
  width: 100vw;
  background-color: #ffff;
  padding: 1rem;
`

export const BoxGd = styled.div`
  display: grid;
  width: 100vw;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 1rem;
`

export const HeaderContent = styled.div`
  background-color: ${theme.color.orange[10]};
  width: 100%;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: red;
  display: flex;

  padding: 10px;
  border-radius: 5px;
`
