import styled from 'styled-components'
import { theme } from '../../theme/theme'

const { color } = theme

export const Container = styled.div`
  input {
    padding: 0 5px;

    flex: 1;
    border: 0;
    background: ${color.blue[50]};
    border: none;
  }
`

export const Title = styled.h1``
