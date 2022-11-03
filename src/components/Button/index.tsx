import { ButtonContainer, ButtonProps } from "./styles"

interface Props {
    variant?: ButtonProps
}

export function Botao({variant = 'primary'}: Props) {
    return (
        <ButtonContainer variant={variant} >enviar</ButtonContainer>
    )
}