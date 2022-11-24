import styled from 'styled-components'
import { theme } from '../../theme/theme'

const { color } = theme

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background: ${color.blue[50]}

  display: grid;
`
