import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Container = styled.div`
  width: 300px;
  background: #4a4545;
  border-radius: 10px;
  padding: 5px;
  margin-left: 5px;

  transition: 0.5s;

  &:hover {
    width: 320px;
  }
`

export const Header = styled.div`
  display: flex;
  background-color: #6ca8b6;
  display: flex;
  width: 100%;
  color: red;
  border-width: 5px;

  align-items: center;
  justify-content: center;
`

export const TextNota = styled.h3`
  color: #1e1717;
`

export const Text = styled.p`
  color: #fff;
`
