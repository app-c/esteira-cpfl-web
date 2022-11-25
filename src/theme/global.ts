import { createGlobalStyle } from 'styled-components'

import { theme } from './theme'

const { color } = theme

export const GlobalStyle = createGlobalStyle`

    * {

        margin: 0;

        padding: 0;

        box-sizing: border-box;

    }



    :focus {

        outline: 0;

        box-shadow: 0 0 0 2px ${color.white[100]};

    }



    body {

        color: ${color.dark[10]};

        background-color: ${color.white[50]};

        -webkit-font-smoothing: antialiased;

    }



    body, input, textarea, button {

        font-family: 'Kumbh Sans', sans-serif;

        font-weight: 400;

        font-size: 1rem;

    }



`
