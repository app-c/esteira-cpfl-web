import styled from 'styled-components'
import { theme } from '../../theme/theme'

const { color } = theme

export const Container = styled.div`
  margin-top: -2px;
  input {
    padding: 0 5px;

    flex: 1;
    border: 0;
    background: #bcdde5;
    border: none;
    font-size: 14px;
  }
`

export const Title = styled.h1`
  font-size: 14px;
`
