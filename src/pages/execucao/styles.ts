import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
export const ContainerCards = styled(motion.div)`
  padding: 5px 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
`

export const Carousel = styled(motion.div)`
  cursor: grab;
  overflow: hidden;
`

export const Inner = styled(motion.div)`
  display: flex;
`

export const ContainerFile = styled.div`
  width: 400px;
`

export const File = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  padding: 5px 20px;
`

export const ContainerButton = styled.div`
  display: flex;
  justify-content: space-between;
  width: 600px;
`

export const Shortcut = styled.div`
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(8, 9rem);
  grid-template-rows: 4rem;
  flex-direction: row;
  grid-gap: 3rem;

  background-color: #74c9a8;

  /* align-items: center; */

  input {
    height: 40px;
    align-self: center;
    padding: 0 10px;
    font-size: 14px;
  }
`
