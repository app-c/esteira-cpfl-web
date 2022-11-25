/* eslint-disable array-callback-return */
import { Form } from '@unform/web'
import { useCallback, useContext, useMemo, useState } from 'react'
import { NotasContext } from '../../context/ListNotas'
import { IPropsEquipe, IProsEster, IProsFuncionarios } from '../../dtos'
import { theme } from '../../theme/theme'
import { Botao } from '../Button'
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
  ContentTitle,
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
  const [select, setSelect] = useState<IPropsEquipe[]>([])

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

  console.log(select)

  const handleSubimit = useCallback((data: object) => {
    console.log(data)
  }, [])

  return (
    <Form
      onSubmit={handleSubimit}
      initialData={{
        nota: nota.Nota,
        mo: nota.MO,
        dt_programacao: nota.Dt_programação,
        documento: nota.TLE,
        cidade: nota.cidade,
      }}
    >
      <Container>
        <ContentGrid>
          <Content className="info">
            <h4>Informação da nota</h4>
            <ContentTitle className="title">
              <p>Nota: </p>
              <p>MO: </p>
              <p>Dt_programação: </p>
              <p>TES / TLE: </p>
              <p>Cidade: </p>
              {/* <p>Descricao_da_nota: </p>
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
              <p>CAPEX: </p> */}
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
          </Content>

          <ContainerEquipe className="equipe">
            {bancoEquipe.map((h) => (
              <button
                style={{
                  background:
                    select.findIndex((i) => i.id === h.id) !== -1
                      ? theme.color.green[10]
                      : '#fff',
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
            {/* {bancoEquipe.map((h) => (
              <div key={h.id}>
                <p>Já lançadas no SGDO</p>
              </div>
            ))} */}
          </ContainerSituaton>

          <ContainerAlert className="alert">
            {/* {equipes.map((h) => (
              <div key={h}>
                <p>Já lançadas no SGDO</p>
              </div>
            ))} */}
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
          <Button type="submit">Salvar</Button>
        </ContainerButton>
      </Container>
    </Form>
  )
}
