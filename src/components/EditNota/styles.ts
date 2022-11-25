import styled from 'styled-components'
import { theme } from '../../theme/theme'

const { color } = theme

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  background: ${color.blue[50]};
`

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 25rem 1fr;
  grid-template-rows: 25rem 1fr 1fr;
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
  background-color: #fff;

  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 5rem 5rem;
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

  div {
    padding: 10px;
    border-radius: 5px;
    background: red;
  }
`

export const ContainerAlert = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  background: red;
`

export const Content = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 3rem 1fr 1fr;
  grid-gap: 1px;
  background-color: ${color.blue[50]};

  h4 {
    display: flex;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
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
