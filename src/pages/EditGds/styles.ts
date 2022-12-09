import styled from 'styled-components'
import { theme } from '../../theme/theme'

export const Container = styled.div`
  flex: 1;
  display: flex;
  padding: 20px;
`

export const BoxGds = styled.div`
  display: grid;
  width: 100vw;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
`

export const HeaderContent = styled.div`
  display: flex;
  background-color: ${theme.color.orange[10]};
  width: 100%;
  align-items: center;
  justify-content: center;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #323232;
  display: flex;

  padding: 10px;
  border-radius: 5px;
  min-height: 10rem;

  p {
    margin-top: 3px;
  }
`
