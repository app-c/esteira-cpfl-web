import styled from 'styled-components'
import { theme } from '../../theme/theme'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    align-self: center;
  }

  background-color: ${theme.color.dark[50]};
  padding: 2rem;
`

export const BoxTratativa = styled.div`
  margin-top: 4rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 20rem 10rem;

  .obsFocal {
    display: flex;
    flex-direction: row;
    margin-top: 20px;

    .medida {
      margin-left: 10rem;
      display: grid;
      grid-gap: 2rem;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;

      button {
        background-color: ${theme.color.blue[50]};
        border-radius: 4px;
        border: none;
        padding: 5px;
      }
    }
  }

  .botao {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5rem;

    .salvar {
      background: ${theme.color.red[50]};
      margin-right: 10rem;
    }
  }
`

export const But = styled.button`
  border: none;
  border-radius: 5px;
  padding: 10px 30px;
  background: ${theme.color.green[50]};
`
