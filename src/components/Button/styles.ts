import styled, { css } from 'styled-components'

export type ButtonProps = 'primary' | 'secundary' | 'danger' | 'success'

interface PropsButtonContainer {
    variant: ButtonProps
}

const variants = {
    primary: 'purple',
    secundary: 'orange',
    danger: 'red',
    success: 'green'
}

export const ButtonContainer = styled.button<PropsButtonContainer>`
    width: 100px;
    height: 200px;

    ${props => {
        return css`background-color: ${variants[props.variant]}`
    }}
`;