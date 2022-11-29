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
  display: grid;
  grid-template-columns: 25rem 1fr;
  grid-template-rows: 25rem 14rem 15rem 15rem;
  grid-gap: 2rem;
  /* background-color: #fff; */

  .situation {
    grid-column-start: 2;
    grid-row-start: 2;
  }

  .alert {
    grid-column-start: 2;
    grid-row-start: 3;
  }
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
export const ContainerSituaton = styled.div`
  /* background-color: #fff; */

  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 3rem 3rem;
  grid-gap: 1rem;

  /* height: 15rem; */

  h4 {
    display: flex;
    flex-direction: row;
    grid-column-start: 1;
    grid-column-end: 8;
    align-self: center;
    justify-content: center;
    color: ${theme.color.white[50]};
  }
`
export const ContentSituation = styled.button<PropsSituation>`
  border: 2px solid #555555;
  display: flex;
  height: 2rem;
  align-items: center;
  justify-content: center;
  color: #ffff;
  padding: 10px;
  border-radius: 5px;
  background: ${({ color: h }) => h};

  &:hover {
    opacity: 0.6;
  }
`

export const ContainerAlert = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  border-radius: 10px;
  padding: 10px;
  grid-gap: 10px;

  h4 {
    display: flex;
    align-self: center;
    justify-content: center;
    grid-column-start: 1;
    grid-column-end: 5;
  }
  button {
    border: 2px solid ${theme.color.dark[10]};
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
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
    color: #9c9c9e;
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
  }
`

export const ContentElement = styled.div`
  padding: 5px;
  p {
    color: ${theme.color.dark[10]};
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
