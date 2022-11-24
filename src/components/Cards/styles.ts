import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Container = styled.div`
  width: 300px;
  background: #ffffff;
  border-radius: 10px;
  padding: 5px;
  margin-left: 5px;
  border: solid 1px #252020;

  transition: 0.5s;

  &:hover {
    width: 310px;
  }
`

export const Header = styled.div`
  display: flex;
  background-color: #6ca8b6;
  display: flex;
  width: 100%;
  border-width: 5px;

  align-items: center;
  justify-content: center;
`

export const TextNota = styled.h3`
  color: #242121;
`

export const Text = styled.p`
  color: #0a0909;
`

export const ContainerButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  button {
    padding: 2px;
    border: none;
    margin-top: 20px;
    border-radius: 4px;
  }
`
