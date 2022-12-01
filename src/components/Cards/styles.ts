import styled from 'styled-components'
import { theme } from '../../theme/theme'

type BorderProps = 'executada' | 'parcial' | 'cancelada' | 'default'
interface PropsContainer {
  border: BorderProps
  bg: BorderProps
}

const borderVariant = {
  executada: theme.color.green[10],
  parcial: theme.color.orange[10],
  cancelada: theme.color.red[10],
  default: 'transparent',
}

const bgVariant = {
  executada: theme.color.green[50],
  parcial: theme.color.orange[50],
  cancelada: theme.color.red[50],
  default: 'transparent',
}

export const Circle = styled.div`
  display: flex;
  width: 400px;
  height: 400px;
  border-radius: 200px;
  background-color: #903a3a;
  position: relative;

  margin-top: 2rem;
  left: 8rem;
`

export const Container = styled.div<PropsContainer>`
  overflow: hidden;
  width: 250px;
  height: 150px;
  background: rgba(145, 145, 145, 0.392);
  border-radius: 10px;
  padding: 5px;
  margin-left: 5px;
  z-index: 1;

  border: solid 4px ${({ border: h }) => borderVariant[h]};

  transition: 0.5s;

  &:hover {
    width: 310px;
  }
`

export const Content = styled.div`
  display: grid;
`

export const BoxEquipe = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1.5rem 1.5rem;
  background-color: ${theme.color.white[100]};
  border-radius: 5px;
  padding: 10px;
`

export const Header = styled.div`
  display: flex;
  background-color: #6ca8b6;
  display: flex;
  width: 100%;
  border-width: 5px;

  align-items: center;
  justify-content: center;
`

export const TextNota = styled.h3`
  color: #242121;
  font-size: 16px;
`

export const Text = styled.p`
  color: #0a0909;
  font-size: 14px;
`

export const ContainerButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  button {
    padding: 2px;
    border: none;
    margin-top: 20px;
    border-radius: 4px;
  }
`
