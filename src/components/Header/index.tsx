import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, ContainerDate, DateInput, Search } from './styles'

interface Props {
  dateA: (item: string) => void
  dateB: (item: string) => void
  value: (item: string) => void
}

export function Header({ dateA, dateB, value }: Props) {
  const navigate = useNavigate()
  const datePresent = new Date()
  const [dtA, setDateA] = useState(format(datePresent, 'yyyy-MM-dd'))
  const [dtB, setDateB] = useState(format(datePresent, 'yyyy-MM-dd'))
  const [search, setSearch] = useState('')

  useEffect(() => {
    dateA(dtA)
    dateB(dtB)
  }, [dateA, dateB, dtA, dtB])

  useEffect(() => {
    value(search)
  }, [value, search])

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
      <button onClick={() => navigate('/planejamento')}>planejamento</button>
      <button onClick={() => navigate('/')}>base</button>
      <Search
        onChange={(h) => setSearch(h.currentTarget.value)}
        placeholder="pesquisar nota"
      />
    </Container>
  )
}
