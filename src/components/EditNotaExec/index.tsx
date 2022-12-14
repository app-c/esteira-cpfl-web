/* eslint-disable camelcase */
/* eslint-disable array-callback-return */
import { Form } from '@unform/web'
import { format } from 'date-fns'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { useCallback, useContext, useMemo, useState } from 'react'
import { fire } from '../../config/firebase'
import { NotasContext } from '../../context/ListNotas'
import { IPropsEquipe, IProsEster } from '../../dtos'
import { theme } from '../../theme/theme'
import { BoxEquipe } from '../BoxEquipe'
import { Input } from '../Input/Input'
import {
  BoxOfficer,
  Button,
  Container,
  ContainerButton,
  ContainerEquipe,
  Content,
  ContentElement,
  ContentGrid,
  ContentTitle
} from './styles'
interface Props {
  nota: IProsEster
  closed: () => void
}

interface PropsOfficer {
  name: string
  id: string
}

const Officer = [
  { name: 'Adelino', id: '1' },
  { name: 'Diego', id: '2' },
  { name: 'Douglas', id: '3' },
  { name: 'Paulo', id: '4' },
]

export function EditNotaExec({ nota, closed }: Props) {
  const eqp = nota.EQUIPE || []
  const { GDS, gds } = useContext(NotasContext)
  const [select, setSelect] = useState<IPropsEquipe[]>(eqp)

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
      if (b.equipe < a.equipe) {
        return 0
      }
      return -1
    }),
  )

  const equipe = useMemo(() => {
    const arry: IPropsEquipe[] = []

    bancoEquipe.forEach((e) => {
      let vl = 0
      let vlf = 0

      gds.find((g) => {
        if (g.nota !== nota.Nota && g.equipe === e.equipe) {
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
  }, [bancoEquipe, gds, nota.Nota, select])

  const [officer, setOfficer] = useState(nota.SUPERVISOR || 'nenhum')

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

  const handleSubimit = useCallback(
    (data: IProsEster) => {
      const mo = String(data.MO).slice()

      const Eqp = select.map((h) => {
        const fil = equipe.find((p) => p.equipe === h.equipe)
        return {
          ...h,
          faturamento: fil?.faturamento,
        }
      })

      const { TLE, cidade, Dt_programa????o, Nota, MO } = data
      const dados = {
        ...nota,
        cidade,
        TLE,
        MO: mo,
        EQUIPE: Eqp,
        Dt_programa????o,
        SUPERVISOR: officer,
        obsExecu??ao: '',
        obsTratativa: '',
        updateAt: format(new Date(), 'dd/MM/yyyy'),
      }

      const cole = collection(fire, 'notas')
      const ref = doc(cole, nota.id)
      const cl = collection(fire, 'gds')

      gds.forEach((h) => {
        if (h.nota === nota.Nota && h.data === nota.Dt_programa????o) {
          const rf = doc(cl, h.id)

          updateDoc(rf, {
            valor: 0,
          })
        }
      })

      Eqp.forEach((h) => {
        const fil = gds.find(
          (p) => p.equipe === h.equipe && p.nota === nota.Nota,
        )

        if (fil) {
          const rf = doc(cl, fil.id)
          const dt = {
            equipe: fil.equipe,
            nota: nota.Nota,
            data: nota.Dt_programa????o,
            valor: Number(h.faturamento),
          }
          updateDoc(rf, dt).then(() => console.log('gds atualizado'))
        } else {
          const dt = {
            equipe: h.equipe,
            nota: nota.Nota,
            data: nota.Dt_programa????o,
            valor: Number(h.faturamento),
          }

          addDoc(cl, dt).then(() => console.log('gds criados'))
        }
      })

      updateDoc(ref, dados).then(() => {
        alert('nota atualizada')
        closed()
      })
    },
    [select, nota, officer, gds, equipe, closed],
  )

  const numero = String(nota.MO)
  const val = numero.replace(/([0-9]{0})$/g, '.$100')
  const mo = Number(val).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <Container>
      <ContentGrid>
        <Content className="info">
          <h4 style={{ color: '#ffff' }}>Informa????o da nota</h4>
          <Form
            style={{ display: 'flex' }}
            onSubmit={handleSubimit}
            initialData={{
              Nota: nota.Nota,
              MO: mo,
              Dt_programa????o: nota.Dt_programa????o,
              TLE: nota.TLE,
              cidade: nota.cidade,
            }}
          >
            <div className="info">
              <ContentTitle className="title">
                <p>Nota: </p>
                <p>MO: </p>
                <p>Dt_programa????o: </p>
                <p>TES / TLE: </p>
                <p>Cidade: </p>
                {/* <p>Descricao_da_nota: </p> */}
                <p>TAM: </p>
                <p>Depart: </p>
                <p>Divis??o: </p>
                <p>Bop: </p>
                <p>Distribuidora: </p>
                <p>F??brica: </p>
                <p>Status: </p>
                <p>C??digo: </p>
                <p>Texto_cod_medida: </p>
                <p>Dt_Cria????o: </p>
                <p>Local_inst: </p>

                <p>Alimentador: </p>
                <p>Conjunto_el??trico: </p>
                <p>Qtde_clientes: </p>
                <p>CHI_max: </p>
                <p>Obra_livre: </p>
                <p>Nota_pai: </p>
                <p>Possui_DI: </p>
                <p>Num_DI: </p>
                <p>Possui_viab: </p>
                <p>Data_viab: </p>
                <p>Dt_Empreita: </p>
                <p>M??s_empreita: </p>
                <p>Ano_empreita: </p>
                <p>Km: </p>
                <p>CAPEX: </p>
              </ContentTitle>

              <ContentElement>
                <Input
                  style={{ marginBottom: 5 }}
                  name="Nota"
                  placeholder={'n??mero da nota'}
                />
                <Input
                  style={{ marginBottom: 5 }}
                  name="MO"
                  placeholder={'MO da nota'}
                />
                <Input
                  name="Dt_programa????o"
                  style={{ marginBottom: 5 }}
                  placeholder={'data'}
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
  placeholder={'n??mero da nota'}
/> */}
              </ContentElement>
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

        <BoxOfficer>
          {Officer.map((h) => (
            <button
              onClick={() => setOfficer(h.name)}
              key={h.id}
              style={{
                background:
                  officer === h.name
                    ? theme.color.blue[50]
                    : theme.color.white[50],
              }}
            >
              <h4>{h.name}</h4>
            </button>
          ))}
        </BoxOfficer>

        <div className="obsPlanejamento">
          <div style={{ backgroundColor: '#5e6263' }}>
            <p>
              Observa????es do planejamento: {'\n'}
              {nota.obsPlanejamento}
            </p>
            <div>
              <p>{nota.obsPlanejamento}</p>
            </div>
          </div>

          <div className="obsExecucao">
            <p>
              Observa????es da execu????o: {'\n'}
              {nota.obsExecu??ao}
            </p>
          </div>
        </div>
      </ContentGrid>
    </Container>
  )
}
