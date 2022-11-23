import { format } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
import { Container, ContainerDate, DateInput, Search, Text } from './styles'

interface Props {
  dateA: (item: string) => void
  dateB: (item: string) => void
}

export function Header({ dateA, dateB }: Props) {
  const datePresent = new Date()
  const [dtA, setDateA] = useState(format(datePresent, 'yyyy-MM-dd'))
  const [dtB, setDateB] = useState(format(datePresent, 'yyyy-MM-dd'))

  useEffect(() => {
    dateA(dtA)
    dateB(dtB)
  }, [dateA, dateB, dtA, dtB])

  return (
    <Container>
      <ContainerDate>
        <DateInput
          onChange={(h) => {
            setDateA(h.target.value)
          }}
          value={dtA}
          type="date"
        />
        <DateInput
          onChange={(h) => {
            setDateB(h.target.value)
          }}
          value={dtB}
          type="date"
        />
      </ContainerDate>
      <Search placeholder="pesquisar nota" />
    </Container>
  )
}
