import { Form } from '@unform/web'
import { addDoc, collection } from 'firebase/firestore'
import React from 'react'
import { fire } from '../../config/firebase'
import { Botao } from '../Button'
import { Input } from '../Input/Input'
import { BoxInput, Container } from './styles'

interface PropsNota {
  nota: string
  mo: number
  data: string
  doc: string
}

interface Props {
  closed: () => void
}

export function AddNota({ closed }: Props) {
  React.useEffect(() => {}, [])

  const handleSubmit = React.useCallback(
    (data: PropsNota) => {
      const col = collection(fire, 'planejamento')
      const dt = {
        Nota: data.nota,
        MO: Number(data.mo),
        Dt_programação: data.data,
        TLE: data.doc,
        EQUIPE: [],
        ntSituation: {
          name: 'Documento SPiR emitido',
          sigla: 'n/a',
          id: 23,
          color1: 'rgba(169, 169, 169, 0.08)',
          color: '#c1c1c1',
        },
        situation: 'edicao',
      }
      console.log(dt)
      addDoc(col, dt).then((h) => closed())
    },
    [closed],
  )

  return (
    <Container>
      <h2>Adicionar nota</h2>

      <Form onSubmit={handleSubmit}>
        <BoxInput>
          <Input
            placeholder="número da nota"
            style={{ padding: 5, marginTop: 15 }}
            name="nota"
          />
          <Input
            placeholder="MO"
            style={{ padding: 5, marginTop: 15 }}
            name="mo"
          />
          <Input
            placeholder="data para execução"
            style={{ padding: 5, marginTop: 15 }}
            name="data"
          />
          <Input
            placeholder="documento"
            style={{ padding: 5, marginTop: 15 }}
            name="doc"
          />

          <div className="boxButon">
            <Botao title="descartar" variant="secundary" />
            <Botao title="salvar" />
          </div>
        </BoxInput>
      </Form>
    </Container>
  )
}
