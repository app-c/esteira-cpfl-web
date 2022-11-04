import styled from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '../../theme/theme'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
export const ContainerCards = styled(motion.div)`
  display: flex;
  width: 100%;
  max-width: 1200px;
`

export const Carousel = styled(motion.div)`
  cursor: grab;
  overflow: hidden;
`

export const Inner = styled(motion.div)`
  display: flex;
`

export const File = styled.input`
  background-color: ${theme.color.blue[10]};
  cursor: pointer;
  transition: background-color: ${theme.color.blue[50]};

  /* &:hover {
    background-color
  } */
`
