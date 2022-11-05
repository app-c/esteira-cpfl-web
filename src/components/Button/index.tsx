import { ButtonContainer, ButtonProps } from './styles'

interface Props {
  variant?: ButtonProps
  pres: () => void
  title: string
}

export function Botao({ variant = 'primary', pres, title }: Props) {
  return (
    <ButtonContainer variant={variant} onClick={pres} type="submit">
      {title}
    </ButtonContainer>
  )
}
