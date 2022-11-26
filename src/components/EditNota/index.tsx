/* eslint-disable array-callback-return */
import { Form } from '@unform/web'
import { format } from 'date-fns'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { useCallback, useContext, useState } from 'react'
import { fire } from '../../config/firebase'
import { NotasContext } from '../../context/ListNotas'
import { IAlert, INtSituation, IPropsEquipe, IProsEster } from '../../dtos'
import { theme } from '../../theme/theme'
import { alert as Alert } from '../../utils/alert'
import { notaSituation } from '../../utils/notaSituation'
import { Input } from '../Input/Input'
import {
  Button,
  Container,
  ContainerAlert,
  ContainerButton,
  ContainerEquipe,
  ContainerSituaton,
  Content,
  ContentElement,
  ContentGrid,
  ContentSituation,
  ContentTitle
} from './styles'
interface Props {
  nota: IProsEster
  closed: () => void
}

export function EditNota({ nota, closed }: Props) {
  const { GDS } = useContext(NotasContext)
  const [bancoEquipe, setBancoEquipe] = useState<IPropsEquipe[]>(
    GDS.filter((h) => {
      if (
        h.equipe !== 'MONTADOR' &&
        h.equipe !== 'VIABILIDADE' &&
        h.equipe !== 'ALMOXARIFADO'
      ) {
        return h
      }
    }),
  )

  const [ntSituation, setNtSituation] = useState<INtSituation>(
    {} as INtSituation,
  )

  const [notaUpdate, setNotaUpdade] = useState<IProsEster>()

  const eqp = nota.EQUIPE || []
  const [select, setSelect] = useState<IPropsEquipe[]>(eqp)
  const [selectAlert, setSelectAlert] = useState<IAlert[]>(Alert)
  const [obsPlanejamento, setObsPlanejamento] = useState(nota.obsPlanejamento)

  const toggleSecection = useCallback(
    (item: IPropsEquipe) => {
      const index = select.findIndex((i) => i.id === item.id)
      const arrSelect = [...select]
      if (index !== -1) {
        arrSelect.splice(index, 1)
      } else {
        arrSelect.push(item)
      }

      setSelect(arrSelect)
    },
    [select],
  )

  const toggleSecectionAlert = useCallback(
    (item: IAlert) => {
      const index = selectAlert.findIndex((i) => i.id === item.id)
      const arrSelect = [...selectAlert]
      if (index !== -1) {
        arrSelect.splice(index, 1)
      } else {
        arrSelect.push(item)
      }

      setSelectAlert(arrSelect)
    },
    [selectAlert],
  )

  const handleSubimit = useCallback(
    (data: object) => {
      const dados = {
        ...data,
        ...nota,
        EQUIPE: select,
        ntSituation,
        obsPlanejamento,
        obsExecuçao: '',
        obsTratativa: '',
        updateAt: format(new Date(), 'dd/MM/yyyy'),
      }

      console.log('submit')

      setNotaUpdade(dados)
    },
    [nota, select, ntSituation, obsPlanejamento],
  )

  const handleUpdade = useCallback(() => {
    const cole = collection(fire, 'planejamento')
    const ref = doc(cole, nota.id)
    updateDoc(ref, notaUpdate).then(() => {
      alert('nota atualizada')
      closed()
    })
  }, [closed, nota.id, notaUpdate])

  console.log(obsPlanejamento)

  const numero = String(nota.MO)
  const val = numero.replace(/([0-9]{0})$/g, '.$100')
  const mo = Number(val).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <Form
      onSubmit={handleSubimit}
      initialData={{
        nota: nota.Nota,
        mo,
        dt_programacao: nota.Dt_programação,
        documento: nota.TLE,
        cidade: nota.cidade,
      }}
    >
      <Container>
        <ContentGrid>
          <Content className="info">
            <h4>Informação da nota</h4>
            <div className="info">
              <ContentTitle className="title">
                <p>Nota: </p>
                <p>MO: </p>
                <p>Dt_programação: </p>
                <p>TES / TLE: </p>
                <p>Cidade: </p>
                {/* <p>Descricao_da_nota: </p> */}
                <p>TAM: </p>
                <p>Depart: </p>
                <p>Divisão: </p>
                <p>Bop: </p>
                <p>Distribuidora: </p>
                <p>Fábrica: </p>
                <p>Status: </p>
                <p>Código: </p>
                <p>Texto_cod_medida: </p>
                <p>Dt_Criação: </p>
                <p>Local_inst: </p>

                <p>Alimentador: </p>
                <p>Conjunto_elétrico: </p>
                <p>Qtde_clientes: </p>
                <p>CHI_max: </p>
                <p>Obra_livre: </p>
                <p>Nota_pai: </p>
                <p>Possui_DI: </p>
                <p>Num_DI: </p>
                <p>Possui_viab: </p>
                <p>Data_viab: </p>
                <p>Dt_Empreita: </p>
                <p>Mês_empreita: </p>
                <p>Ano_empreita: </p>
                <p>Km: </p>
                <p>CAPEX: </p>
              </ContentTitle>

              <ContentElement>
                <Input
                  style={{ marginBottom: 5 }}
                  name="nota"
                  placeholder={'número da nota'}
                />
                <Input
                  style={{ marginBottom: 5 }}
                  name="mo"
                  placeholder={'número da nota'}
                />
                <Input
                  name="dt_programacao"
                  style={{ marginBottom: 5 }}
                  placeholder={'número da nota'}
                />

                <Input
                  name="documento"
                  style={{ marginBottom: 5 }}
                  placeholder={'documento'}
                />

                <Input
                  name="cidade"
                  style={{ marginBottom: 5 }}
                  placeholder={'cidade'}
                />

                {/* <Input
  name=""
  style={{ marginBottom: 5 }}
  placeholder={'número da nota'}
/> */}
              </ContentElement>
            </div>
            <div className="obsPlanejamento">
              <p>Observações do planejamento:</p>
              <textarea
                onChange={(h) => setObsPlanejamento(h.currentTarget.value)}
                value={obsPlanejamento}
                name="planejamento"
                id="1"
                cols={40}
                rows={5}
              ></textarea>
            </div>
            <div className="obsFocal">
              <p>Observações do focal</p>
            </div>
            <div className="obsExecucao">
              <p>Observações da execução:</p>
            </div>
          </Content>

          <ContainerEquipe className="equipe">
            {bancoEquipe.map((h) => (
              <button
                style={{
                  background:
                    select.findIndex((i) => i.id === h.id) !== -1
                      ? theme.color.green[10]
                      : '#e2e2e2',
                }}
                key={h.id}
                type="submit"
                onClick={() => toggleSecection(h)}
              >
                <header>
                  <h4>{h.equipe}</h4>
                </header>
                <p>Meta Us: 24</p>
                <p>Orçado: 10</p>
              </button>
            ))}
          </ContainerEquipe>

          <ContainerSituaton className="situation">
            <h4>Situação da nota</h4>
            {notaSituation.map((h) => (
              <ContentSituation
                onClick={() => setNtSituation(h)}
                color={ntSituation.sigla === h.sigla ? h.color : h.color1}
                key={h.id}
              >
                <p>{h.sigla}</p>
              </ContentSituation>
            ))}
          </ContainerSituaton>

          <ContainerAlert className="alert">
            <h4>Alertas</h4>
            {Alert.map((h) => (
              <button
                style={{
                  background:
                    selectAlert.findIndex((i) => i.id === h.id) !== -1
                      ? theme.color.orange[50]
                      : theme.color.orange[10],
                }}
                onClick={() => toggleSecectionAlert(h)}
                key={h.id}
              >
                <p>{h.name}</p>
              </button>
            ))}
          </ContainerAlert>
        </ContentGrid>
        <ContainerButton>
          <Button
            style={{ background: theme.color.orange[50] }}
            type="submit"
            onClick={closed}
          >
            Cancelar
          </Button>
          <Button onClick={handleUpdade} type="submit">
            Salvar
          </Button>
        </ContainerButton>
      </Container>
    </Form>
  )
}
