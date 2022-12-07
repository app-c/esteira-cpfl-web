import { format } from 'date-fns'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { useCallback, useState } from 'react'
import { fire } from '../../config/firebase'
import { IProsEster } from '../../dtos'
import { theme } from '../../theme/theme'
import { textMedida } from '../../utils/textMedida'
import { BoxTratativa, But, Container } from './styles'

interface Props {
  nota: IProsEster
  closed: () => void
}

export function ModalTratativa({ nota, closed }: Props) {
  const [obsFocal, setObsFocal] = useState(nota.obsTratativa)
  const [tratativa, setTratativa] = useState('')

  const handleSubmit = useCallback(async () => {
    const cole = collection(fire, 'notas')
    const rf = doc(cole, nota.id)

    const dados = {
      ...nota,
      situation: 'rt',
      obsTratativa: `${obsFocal} ${'\n'} ${'\n'}Motivo: ${'\n'}${tratativa}`,
      obsExecucao: nota.OBSERVACAO,
      updateAt: format(new Date(), 'dd/MM/yyyy'),
    }

    updateDoc(rf, dados)
    closed()
  }, [closed, nota, obsFocal, tratativa])

  return (
    <Container>
      <h2>Observações para a torre</h2>
      <BoxTratativa>
        <div className="obsFocal">
          <div className="text">
            <p>Observações gerais</p>
            <textarea
              onChange={(h) => setObsFocal(h.currentTarget.value)}
              value={obsFocal}
              name="planejamento"
              id="1"
              cols={40}
              rows={5}
            ></textarea>

            <div className="pos">
              <h5>Observações pós obra</h5>
              {nota.OBSERVACAO}
            </div>
          </div>

          <div className="medida">
            {textMedida.map((h) => (
              <button
                onClick={() => setTratativa(h.name)}
                key={h.name}
                style={{
                  background:
                    tratativa === h.name
                      ? theme.color.blue[10]
                      : theme.color.blue[50],
                }}
              >
                <p>{h.name}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="botao">
          <But onClick={() => closed()} className="salvar">
            <p>Cancelar</p>
          </But>

          <But onClick={handleSubmit}>
            <p>Salvar</p>
          </But>
        </div>
      </BoxTratativa>
    </Container>
  )
}
