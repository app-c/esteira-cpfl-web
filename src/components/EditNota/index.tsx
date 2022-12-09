/* eslint-disable no-use-before-define */
/* eslint-disable array-callback-return */
import { Form } from '@unform/web'
import { format } from 'date-fns'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { useCallback, useContext, useMemo, useState } from 'react'
import { fire } from '../../config/firebase'
import { NotasContext } from '../../context/ListNotas'
import { IAlert, INtSituation, IPropsEquipe, IProsEster } from '../../dtos'
import { theme } from '../../theme/theme'
import { alert as Alert } from '../../utils/alert'
import { notaSituation } from '../../utils/notaSituation'
import { BoxEquipe } from '../BoxEquipe'
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
  const { gds, GDS } = useContext(NotasContext)

  const [bancoEquipe, setBancoEquipe] = useState<IPropsEquipe[]>(
    GDS.filter((h) => {
      if (
        h.equipe !== 'MONTADOR' &&
        h.equipe !== 'VIABILIDADE' &&
        h.equipe !== 'ALMOXARIFADO'
      ) {
        return h
      }
    }).sort((a, b) => {
      if (b.equipe > a.equipe) {
        return -1
      }
      return 0
    }),
  )

  const [ntSituation, setNtSituation] = useState<INtSituation>(
    {} as INtSituation,
  )

  const [notaUpdate, setNotaUpdade] = useState<IProsEster>()

  const eqp = nota.EQUIPE || []
  const [select, setSelect] = useState<IPropsEquipe[]>(eqp)
  const [selectAlert, setSelectAlert] = useState<IAlert[]>([])
  const [obsPlanejamento, setObsPlanejamento] = useState(nota.obsPlanejamento)

  const equipe = useMemo(() => {
    const arry: IPropsEquipe[] = []

    bancoEquipe.forEach((e) => {
      let vl = 0
      let vlf = 0

      gds.find((g) => {
        if (
          g.nota !== nota.Nota &&
          g.equipe === e.equipe &&
          g.data === nota.Dt_programação
        ) {
          console.log(g.valor, g.equipe)
          vlf = g.valor
        }

        // if (g.nota === nota.Nota && g.equipe === e.equipe) {
        //   vlf = e.faturamento
        // }
      })

      select.forEach((s) => {
        if (s.equipe === e.equipe) {
          vl = s.faturamento / select.length
        }
      })

      const valor = vl + vlf

      const dt = {
        ...e,
        faturamento: Number(valor.toFixed(0)),
      }

      arry.push(dt)
    })
    return arry
  }, [bancoEquipe, gds, nota.Dt_programação, nota.Nota, select])

  const toggleSecection = useCallback(
    (item: IPropsEquipe) => {
      const index = select.findIndex((i) => i.equipe === item.equipe)

      const arrSelect = [...select]
      if (index !== -1) {
        arrSelect.splice(index, 1)
      } else {
        const dt = {
          ...item,
          faturamento: nota.MO / 168.96,
        }
        arrSelect.push(dt)
      }

      setSelect(arrSelect)
    },
    [nota.MO, select],
  )

  console.log(select)

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
    (data: IProsEster) => {
      const mo = String(data.MO).replace(/[^0-9]/g, '')

      const eqp = select.map((h) => {
        const fil = equipe.find((p) => p.equipe === h.equipe)
        // console.log(fil?.faturamento)
        return {
          ...h,
          faturamento: fil?.faturamento,
        }
      })

      const dados = {
        ...data,
        ...nota,
        Dt_programação: data.Dt_programação,
        TLE: data.TLE,
        Nota: data.Nota,
        cidade: data.cidade,
        MO: Number(mo) / 100,
        EQUIPE: eqp,
        ntSituation,
        obsPlanejamento: obsPlanejamento || '',
        alertas: selectAlert,
        obsExecuçao: nota.obsExecuçao || '',
        obsTratativa: nota.obsTratativa || '',
        updateAt: format(new Date(), 'dd/MM/yyyy'),
      }

      const cole = collection(fire, 'planejamento')
      const cl = collection(fire, 'gds')
      const ref = doc(cole, nota.id)

      gds.forEach((h) => {
        if (h.nota === nota.Nota && h.data === nota.Dt_programação) {
          const rf = doc(cl, h.id)

          updateDoc(rf, {
            valor: 0,
          })
        }
      })

      eqp.forEach((h) => {
        const fil = gds.find(
          (p) => p.equipe === h.equipe && p.nota === nota.Nota,
        )

        if (fil) {
          const rf = doc(cl, fil.id)
          const dt = {
            equipe: fil.equipe,
            nota: nota.Nota,
            data: nota.Dt_programação,
            valor: Number(h.faturamento),
          }
          updateDoc(rf, dt).then(() => console.log('gds atualizado'))
        } else {
          const dt = {
            equipe: h.equipe,
            nota: nota.Nota,
            data: nota.Dt_programação,
            valor: Number(h.faturamento),
          }

          addDoc(cl, dt).then(() => console.log('gds criados'))
        }
      })

      updateDoc(ref, dados)
        .then(() => {
          alert('nota atualizada')
          closed()
        })
        .then(() => console.log('0k'))
        .catch((h) => console.log(h))
    },
    [
      select,
      nota,
      ntSituation,
      obsPlanejamento,
      selectAlert,
      gds,
      equipe,
      closed,
    ],
  )

  const numero = String(nota.MO)

  const val = numero.replace(/([0-9]{0})$/g, '')
  const mo = Number(nota.MO).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  })
  console.log(mo, 'm')

  return (
    <Container>
      <ContentGrid>
        <Content className="info">
          <h4>Informação da nota</h4>
          <Form
            onSubmit={handleSubimit}
            initialData={{
              Nota: nota.Nota,
              MO: mo,
              Dt_programação: nota.Dt_programação,
              TLE: nota.TLE,
              cidade: nota.cidade,
            }}
          >
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
                  name="Nota"
                  placeholder={'número da nota'}
                />
                <Input
                  style={{ marginBottom: 5 }}
                  name="MO"
                  placeholder={'valor MO'}
                />
                <Input
                  name="Dt_programação"
                  style={{ marginBottom: 5 }}
                  placeholder={'data da programação'}
                />

                <Input
                  name="TLE"
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
                cols={30}
                rows={5}
              ></textarea>
            </div>

            <div className="obsFocal">
              <h4 className="titleT">Observações da tratativa</h4>
              <p>{nota.obsTratativa}</p>
            </div>

            <div className="obsExecucao">
              <h4 className="titleT">Observações da execução/pós obra</h4>
              <p>{nota.obsExecuçao}</p>
            </div>

            <ContainerButton>
              <Button
                style={{ background: theme.color.orange[50] }}
                type="submit"
                onClick={closed}
              >
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </ContainerButton>
          </Form>
        </Content>

        <ContainerEquipe className="equipe">
          {equipe.map((h) => (
            <BoxEquipe
              us={h.faturamento}
              eqp={h.equipe}
              pres={() => toggleSecection(h)}
              select={select.findIndex((i) => i.equipe === h.equipe) !== -1}
              key={h.id}
            />
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
                    ? theme.color.orange[10]
                    : theme.color.orange[50],
              }}
              onClick={() => toggleSecectionAlert(h)}
              key={h.id}
            >
              <p>{h.name}</p>
            </button>
          ))}
        </ContainerAlert>
      </ContentGrid>
    </Container>
  )
}
