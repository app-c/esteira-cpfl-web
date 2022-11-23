import styled, { css } from 'styled-components'
import { theme } from '../../theme/theme'

export type ButtonProps = 'primary' | 'secundary' | 'danger' | 'success'

interface PropsButtonContainer {
  variant: ButtonProps
}

const variants = {
  primary: theme.color.blue[10],
  secundary: theme.color.orange[10],
  danger: theme.color.red[10],
  success: theme.color.green[10],
}

export const ButtonContainer = styled.button<PropsButtonContainer>`
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 800;
  padding: 0 10px;
  border: none;
  min-width: 4rem;

  cursor: pointer;

  ${(props) => {
    return css`
      background-color: ${variants[props.variant]};
    `
  }};

  &:hover {
    opacity: 0.5;
  }
`

export const Title = styled.p`
  color: ${theme.color.white[50]};
  font-size: 14px;
`
