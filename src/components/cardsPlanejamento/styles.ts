import styled from 'styled-components'
import { theme } from '../../theme/theme'

type BorderProps =
  | 'estera'
  | 'processo'
  | 'parcial'
  | 'cancelada'
  | 'edicao'
  | 'executada'
interface PropsContainer {
  borderC: BorderProps
}

interface PropsHeader {
  color: string
}

const borderVariant = {
  edicao: theme.color.dark[50],
  parcial: theme.color.orange[10],
  cancelada: theme.color.red[10],
  estera: theme.color.white[50],
  processo: theme.color.white[50],
  executada: theme.color.white[50],
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
  background-color: #c6c6c6;
  position: absolute;
  z-index: 1;

  top: -15rem;
  right: 0rem;
`

export const Container = styled.div<PropsContainer>`
  width: 270px;
  min-height: 150px;
  background: rgba(145, 145, 145, 0.392);
  border-radius: 10px;
  padding: 5px;
  margin-left: 10px;

  border: solid 3px ${({ borderC: h }) => borderVariant[h]};

  transition: 0.5s;

  &:hover {
    width: 280px;
  }
`

export const Content = styled.div`
  display: grid;
  z-index: 2;

  .texto {
    margin: 10px 0;
    padding: 0 10px;
    p {
      font-size: 0.9rem;
    }
  }
`

export const BoxEquipe = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1rem 1rem;
  background-color: #9af2ffba;
  border-radius: 5px;
  padding: 5px;

  color: ${theme.color.dark[10]};
  font-size: 12px;
  div {
    margin-left: 5px;
  }
`

export const Header = styled.div<PropsHeader>`
  display: flex;
  flex-direction: row;
  padding: 3px 8px;
  background-color: ${({ color: h }) => h};
  display: flex;
  width: 1fr;
  border-width: 5px;
  border-radius: 4px;

  align-items: center;
  justify-content: space-between;

  font-weight: 400;
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
