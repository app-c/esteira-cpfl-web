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

  background: ${color.blue[50]};
`

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 25rem 1fr;
  grid-template-rows: 25rem 14rem 15rem 15rem;
  grid-gap: 2rem;
  /* background-color: #fff; */

  .info {
    height: 100%;
  }

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
  background: ${color.blue[50]};
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
  }
`
export const ContentSituation = styled.button<PropsSituation>`
  display: flex;
  height: 2rem;
  align-items: center;
  justify-content: center;
  color: #ffff;
  padding: 10px;
  border-radius: 5px;
  background: ${({ color: h }) => h};
`

export const ContainerAlert = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  background: red;
`

export const Content = styled.div`
  grid-row-start: 1;
  grid-row-end: 4;
  padding: 10px;
  display: grid;
  grid-template-rows: 40px 1fr 1fr 1fr;
  grid-gap: 10px;
  background-color: ${color.blue[50]};

  .info {
    display: grid;
    grid-template-columns: 10rem 1fr;
  }

  .obsPlanejamento {
    background: blue;
  }

  h4 {
    display: flex;
    color: #fff;
    align-self: center;
    justify-content: center;
  }
`

export const ContentTitle = styled.div`
  p {
    margin-top: 5px;
    margin-bottom: 5px;
    color: #ffff;
    font-weight: bold;
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
