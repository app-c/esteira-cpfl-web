/* eslint-disable camelcase */
/* eslint-disable array-callback-return */
import { Form } from '@unform/web'
import { format } from 'date-fns'
import { collection, doc, setDoc } from 'firebase/firestore'
import { useCallback, useContext, useState } from 'react'
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
    // .map((h) => {
    //   return {
    //     ...h,
    //     data: nota.Dt_programação,
    //   }
    // }),
  )

  const eqp = nota.EQUIPE || []
  const [select, setSelect] = useState<IPropsEquipe[]>(eqp)
  const [officer, setOfficer] = useState(nota.SUPERVISOR || 'nenhum')

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

  const handleSubimit = useCallback(
    (data: IProsEster) => {
      const mo = String(data.MO).slice()
      const { TLE, cidade, Dt_programação, Nota, MO } = data
      const dados = {
        ...nota,
        cidade,
        TLE,
        EQUIPE: select,
        Dt_programação,
        SUPERVISOR: officer,
        obsExecuçao: '',
        obsTratativa: '',
        updateAt: format(new Date(), 'dd/MM/yyyy'),
      }

      const cole = collection(fire, 'notas')
      const ref = doc(cole, nota.id)

      select.forEach((eq) => {
        const cole = collection(fire, 'gds')
        const rf = doc(cole, eq.id)
        const dados = {
          ...eq,
          data: '00/00/0000',
        }
        setDoc(rf, dados)
      })

      // updateDoc(ref, dados).then(() => {
      //   alert('nota atualizada')
      //   closed()
      // })

      console.log(dados)
    },
    [nota, select, officer, closed],
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
          <h4 style={{ color: '#ffff' }}>Informação da nota</h4>
          <Form
            style={{ display: 'flex' }}
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
                  placeholder={'MO da nota'}
                />
                <Input
                  name="Dt_programação"
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
  placeholder={'número da nota'}
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
          {bancoEquipe.map((h) => (
            <BoxEquipe
              us={h.faturamento}
              eqp={h.equipe}
              pres={() => toggleSecection(h)}
              select={select.findIndex((i) => i.id === h.id) !== -1}
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
              Observações do planejamento: {'\n'}
              {nota.obsPlanejamento}
            </p>
            <div>
              <p>{nota.obsPlanejamento}</p>
            </div>
          </div>

          <div className="obsExecucao">
            <p>
              Observações da execução: {'\n'}
              {nota.obsExecuçao}
            </p>
          </div>
        </div>
      </ContentGrid>
    </Container>
  )
}
