import { motion } from 'framer-motion'
import styled from 'styled-components'
import { theme } from '../../theme/theme'

export const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100vw;
  flex-direction: column;
  /* background-color: ${theme.color.dark[50]}; */
`
export const ContainerCards = styled(motion.div)`
  padding: 5px 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 4rem;
`

export const Carousel = styled(motion.div)`
  cursor: grab;
  overflow: hidden;
`

export const Inner = styled(motion.div)`
  display: flex;
`

export const ContainerFile = styled.div`
  /* background-color: blue; */
`

export const File = styled.div`
  display: grid;
  grid-template-columns: 0.1fr 0.5fr 0.5fr;
  grid-template-rows: 4rem;
  margin-top: 10px;
  padding: 5px 20px;
  grid-gap: 2rem;
  /* background-color: red; */
  input {
    color: ${theme.color.white[50]};
  }

  h1 {
    align-self: center;
  }
`

export const ContainerButton = styled.div`
  display: flex;
  justify-content: space-between;
  width: 600px;
`
