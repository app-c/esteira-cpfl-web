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

  background: #d3d3d3;
`

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 25rem 1fr;
  grid-template-rows: 25rem 7rem 15rem 15rem;
  grid-gap: 2rem;
`

export const ContainerEquipe = styled.div`
  padding: 5px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 6rem 6rem 6rem 6rem;
  grid-gap: 0.5rem;

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
    display: flex;
    flex-direction: column;
    background: #95b6c0;
    /* height: 7rem; */
    border-radius: 10px;
    padding: 5px;
    justify-content: center;
    font-size: 16px;
    font-weight: 800;

    textarea {
      margin-top: 10px;
    }
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
    color: #00032e;
    font-weight: bold;
    font-size: 14px;
  }
`

export const ContentElement = styled.div`
  p {
    color: ${theme.color.dark[10]};
  }
`
export const BoxOfficer = styled.div`
  /* background-color: red; */
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  button {
    border: none;
    width: 10rem;
    height: 4rem;
    border-radius: 5px;
  }
`

export const ContainerButton = styled.div`
  display: flex;
  flex-direction: row;
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
