import styled from 'styled-components'
import { theme } from '../../theme/theme'

const { color } = theme

interface PropsSituation {
  color: string
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  background: ${theme.color.dark[50]};
`

export const ContentGrid = styled.div`
  padding: 5px;
  display: grid;
  grid-template-columns: 25rem 1fr;
  grid-template-rows: 25rem 3rem 8rem 10rem;
  grid-gap: 1rem;

  .obsPlanejamento {
    grid-row-start: 3;
    grid-column-start: 2;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    flex-direction: row;
    border-radius: 5px;
    padding: 5px;
    font-size: 16px;
    font-weight: 400;

    .obsExecucao {
      background-color: #607679;
    }
  }
`

export const ContainerEquipe = styled.div`
  padding: 5px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 5rem 5rem 5rem 5rem;
  grid-gap: 0.5rem 0.1rem;

  button {
    padding: 5px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;

    &:hover {
      opacity: 0.7;
    }
    /* border: 2px solid ${theme.color.red[10]}; */

    header {
      align-self: center;
      margin-bottom: 5px;
    }

    p {
      margin-top: 5px;
      font-size: 0.8rem;
      color: ${theme.color.dark[10]};
    }
  }
`

export const Content = styled.div`
  grid-row-start: 1;
  grid-row-end: 4;
  padding: 10px;
  display: grid;
  grid-gap: 10px;

  .info {
    display: grid;
    grid-template-columns: 10rem 1fr;
  }

  .obsPlanejamento {
  }

  .obsExecucao {
    display: grid;
    background: #c5d377;
    height: 7rem;
  }

  .obsFocal {
    display: grid;
    background: #77bdd3;
    height: 7rem;
  }

  h4 {
    display: flex;
    color: #00021f;
    align-self: center;
    justify-content: center;
  }
`

export const ContentTitle = styled.div`
  p {
    margin-top: 5px;
    margin-bottom: 5px;
    color: ${theme.color.white[50]};
    font-weight: 400;
    font-size: 14px;
  }
`

export const ContentElement = styled.div`
  p {
    color: ${theme.color.dark[10]};
  }
`
export const BoxOfficer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  button {
    border: none;
    width: 10rem;
    height: 2.5rem;
    border-radius: 5px;
  }
`

export const ContainerButton = styled.div`
  position: absolute;

  left: 25rem;

  display: flex;
  flex-direction: row;
  top: 45rem;
  width: 50%;
  height: 3rem;
  align-self: center;
  justify-content: space-around;

  margin-top: 10px;
`
export const Button = styled.button`
  border: none;
  border-radius: 7px;
  width: 10rem;
  background: ${theme.color.blue[10]};
  cursor: pointer;
  color: #fff;
  font-weight: 800;
  font-size: 18px;

  &:hover {
    opacity: 0.7;
  }
`
