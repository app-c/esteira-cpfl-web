/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { eachDayOfInterval, format } from 'date-fns'
import { collection, onSnapshot } from 'firebase/firestore'
import React, { createContext, useEffect } from 'react'
import { fire } from '../config/firebase'
import {
  IC4,
  IFaturamento,
  IGds,
  IPropsEquipe,
  IProsEster,
  IProsFuncionarios
} from '../dtos'

interface ProviderProps {
  children: React.ReactNode
}

interface ProsNotasData {
  par: IProsEster[]
  pla: IProsEster[]
  exe: IProsEster[]
  canc: IProsEster[]
}

interface PropsContext {
  estera: IProsEster[]
  equipes: IProsFuncionarios[]
  gds: IGds[]
  GDS: IPropsEquipe[]
  ntReprogramada: IProsEster[]
  ntCancelada: IProsEster[]
  c4: IC4[]
  emergencia: IC4[]
  faturamento: IFaturamento[]
  notasByDate: (date: Date, dateB: Date) => void
  notasPorData: ProsNotasData
}

export const NotasContext = createContext({} as PropsContext)

export function NotasProvider({ children }: ProviderProps) {
  const [estera, setEstera] = React.useState<IProsEster[]>([])
  const [gds, setGds] = React.useState<IGds[]>([])
  const [equipes, setEquipes] = React.useState<IProsFuncionarios[]>([])
  const [ntReprogramada, setNtReprogramada] = React.useState<IProsEster[]>([])
  const [ntCancelada, setNtCancelada] = React.useState<IProsEster[]>([])
  const [c4, setC4] = React.useState<IC4[]>([])
  const [emergencia, setEmergencia] = React.useState<IC4[]>([])
  const [faturamento, setFaturamaneto] = React.useState<IFaturamento[]>([])
  const [notasPorData, setNotasPorData] = React.useState({} as ProsNotasData)

  const colecNota = collection(fire, 'notas')
  const colecC4 = collection(fire, 'c4')
  const colecEmer = collection(fire, 'emergencia')
  const colecEquip = collection(fire, 'equipes')
  const colecParc = collection(fire, 'nt-parcial')
  const colecCan = collection(fire, 'nt-cancelada')
  const colecFatu = collection(fire, 'faturamento')
  const coleGds = collection(fire, 'gds')

  function loadDatas() {
    onSnapshot(colecNota, (h) => {
      const res = h.docs.map((p) => {
        return {
          ...p.data(),
          id: p.id,
        } as IProsEster
      })

      setEstera(res)
    })

    onSnapshot(coleGds, (h) => {
      const res = h.docs.map((p) => {
        return {
          ...p.data(),
          id: p.id,
        } as IGds
      })

      setGds(res)
    })

    onSnapshot(colecC4, (h) => {
      const res = h.docs.map((p) => {
        return {
          ...p.data(),
          id: p.id,
        } as IC4
      })

      setC4(res)
    })

    onSnapshot(colecEmer, (h) => {
      const res = h.docs.map((p) => {
        return {
          ...p.data(),
          id: p.id,
        } as IC4
      })

      setEmergencia(res)
    })

    onSnapshot(colecEquip, (p) => {
      const rs = p.docs.map((h) => {
        return {
          ...h.data(),
          id: h.id,
        } as IProsFuncionarios
      })
      setEquipes(rs)
    })

    onSnapshot(colecParc, (h) => {
      const res = h.docs.map((p) => {
        return {
          ...p.data(),
          id: p.id,
        } as IProsEster
      })

      setNtReprogramada(res)
    })

    onSnapshot(colecCan, (h) => {
      const res = h.docs.map((p) => {
        return {
          ...p.data(),
          id: p.id,
        } as IProsEster
      })

      setNtCancelada(res)
    })

    onSnapshot(colecFatu, (h) => {
      const rs = h.docs.map((p) => {
        return {
          id: p.id,
          ...p.data(),
        } as IFaturamento
      })

      setFaturamaneto(rs)
    })

    console.log('context')
  }

  useEffect(() => {
    loadDatas()
  }, [])

  console.log('datas')

  const GDS = React.useMemo(() => {
    const ADM: IProsFuncionarios[] = []
    const ALMOXARIFADO: IProsFuncionarios[] = []
    const GD_17: IProsFuncionarios[] = []
    const GD_18: IProsFuncionarios[] = []
    const GD_19: IProsFuncionarios[] = []
    const GD_20: IProsFuncionarios[] = []
    const GD_21: IProsFuncionarios[] = []
    const GD_22: IProsFuncionarios[] = []
    const GD_23: IProsFuncionarios[] = []
    const GD_24: IProsFuncionarios[] = []
    const GD_25: IProsFuncionarios[] = []
    const GD_26: IProsFuncionarios[] = []
    const GD_27: IProsFuncionarios[] = []
    const GD_28: IProsFuncionarios[] = []
    const GD_29: IProsFuncionarios[] = []
    const GD_40: IProsFuncionarios[] = []
    const LM_01: IProsFuncionarios[] = []
    const LM_02: IProsFuncionarios[] = []
    const LM_03: IProsFuncionarios[] = []
    const LM_04: IProsFuncionarios[] = []
    const LV_30: IProsFuncionarios[] = []
    const LV_31: IProsFuncionarios[] = []
    const LV_32: IProsFuncionarios[] = []
    const LV_33: IProsFuncionarios[] = []
    const MONTADOR: IProsFuncionarios[] = []
    const RESERVA: IProsFuncionarios[] = []
    const VIABILIDADE: IProsFuncionarios[] = []

    const equipe = equipes.sort((a, b) => {
      if (b.equipe > a.equipe) {
        return -1
      }
      return 0
    })

    equipe.forEach((h) => {
      if (h.equipe === 'ADM') {
        ADM.push(h)
      }
      if (h.equipe === 'ALMOXARIFADO') {
        ALMOXARIFADO.push(h)
      }
      if (h.equipe === 'GD-17') {
        GD_17.push(h)
      }
      if (h.equipe === 'GD-18') {
        GD_18.push(h)
      }
      if (h.equipe === 'GD-19') {
        GD_19.push(h)
      }
      if (h.equipe === 'GD-20') {
        GD_20.push(h)
      }
      if (h.equipe === 'GD-21') {
        GD_21.push(h)
      }
      if (h.equipe === 'GD-22') {
        GD_22.push(h)
      }
      if (h.equipe === 'GD-23') {
        GD_23.push(h)
      }
      if (h.equipe === 'GD-24') {
        GD_24.push(h)
      }
      if (h.equipe === 'GD-25') {
        GD_25.push(h)
      }
      if (h.equipe === 'GD-26') {
        GD_26.push(h)
      }
      if (h.equipe === 'GD-27') {
        GD_27.push(h)
      }
      if (h.equipe === 'GD-28') {
        GD_28.push(h)
      }
      if (h.equipe === 'GD-29') {
        GD_29.push(h)
      }
      if (h.equipe === 'GD-40') {
        GD_40.push(h)
      }
      if (h.equipe === 'LM-01') {
        LM_01.push(h)
      }
      if (h.equipe === 'LM-02') {
        LM_02.push(h)
      }
      if (h.equipe === 'LM-03') {
        LM_03.push(h)
      }
      if (h.equipe === 'LM-04') {
        LM_04.push(h)
      }
      if (h.equipe === 'LV-30') {
        LV_30.push(h)
      }
      if (h.equipe === 'LV-31') {
        LV_31.push(h)
      }
      if (h.equipe === 'LV-32') {
        LV_32.push(h)
      }
      if (h.equipe === 'LV-33') {
        LV_33.push(h)
      }
      if (h.equipe === 'MONTADOR') {
        MONTADOR.push(h)
      }
      if (h.equipe === 'RESERVA') {
        RESERVA.push(h)
      }
      if (h.equipe === 'VIABILIDADE') {
        VIABILIDADE.push(h)
      }
    })

    const dados = [
      { id: '1', equipe: 'ALMOXARIFADO', dados: ALMOXARIFADO },
      { id: '2', equipe: 'ALMOXARIFADO', dados: ALMOXARIFADO },
      { id: '3', equipe: 'GD-17', dados: GD_17 },
      { id: '4', equipe: 'GD-18', dados: GD_18 },
      { id: '5', equipe: 'GD-19', dados: GD_19 },
      { id: '6', equipe: 'GD-20', dados: GD_20 },
      { id: '7', equipe: 'GD-21', dados: GD_21 },
      { id: '8', equipe: 'GD-22', dados: GD_22 },
      { id: '9', equipe: 'GD-23', dados: GD_23 },
      { id: '0', equipe: 'GD-24', dados: GD_24 },
      { id: '10', equipe: 'GD-25', dados: GD_25 },
      { id: '11', equipe: 'GD-26', dados: GD_26 },
      { id: '12', equipe: 'GD-27', dados: GD_27 },
      { id: '13', equipe: 'GD-28', dados: GD_28 },
      { id: '14', equipe: 'GD-29', dados: GD_29 },
      { id: '15', equipe: 'GD-40', dados: GD_40 },
      { id: '16', equipe: 'LM-01', dados: LM_01 },
      { id: '17', equipe: 'LM-02', dados: LM_02 },
      { id: '18', equipe: 'LM-03', dados: LM_03 },
      { id: '19', equipe: 'LM-04', dados: LM_04 },
      { id: '20', equipe: 'LV-30', dados: LV_30 },
      { id: '21', equipe: 'LV-31', dados: LV_31 },
      { id: '22', equipe: 'LV-32', dados: LV_32 },
      { id: '23', equipe: 'LV-33', dados: LV_33 },
      { id: '24', equipe: 'MONTADOR', dados: MONTADOR },
      { id: '25', equipe: 'RESERVA', dados: RESERVA },
      { id: '26', equipe: 'VIABILIDADE', dados: VIABILIDADE },
    ]

    const gds: IPropsEquipe[] = []

    dados.forEach((h) => {
      const eq = h.dados.find((p) => p.equipe === h.equipe)
      const dt = {
        id: eq ? eq.id : '0',
        equipe: h.equipe,
        mobilidade: false,
        dados: h.dados,
        faturamento: 0,
        data: '00/00/0000',
      }
      gds.push(dt)
    })

    return gds
  }, [equipes])

  const notasByDate = React.useCallback(
    (a: Date, b: Date) => {
      const parcial: IProsEster[] = []
      const executada: IProsEster[] = []
      const planejada: IProsEster[] = []
      const cancelada: IProsEster[] = []
      if (a.getTime() <= b.getTime()) {
        const ruslt = eachDayOfInterval({
          start: a,
          end: b,
        })
        ruslt.forEach((dt) => {
          const fomatDt = format(dt, 'dd/MM/yyyy')

          estera.forEach((item) => {
            if (item.Dt_programação === fomatDt) {
              planejada.push(item)
            }
          })

          estera.forEach((item) => {
            if (
              item.Dt_programação === fomatDt &&
              item.situation === 'executada'
            ) {
              executada.push(item)
            }
          })

          ntReprogramada.forEach((item) => {
            if (fomatDt === item.Dt_programação) {
              parcial.push(item)
              planejada.push(item)
            }
          })

          ntCancelada.forEach((item) => {
            if (fomatDt === item.Dt_programação) {
              cancelada.push(item)
              planejada.push(item)
            }
          })
        })
      }

      const dados = {
        par: parcial,
        pla: planejada,
        exe: executada,
        canc: cancelada,
      }

      setNotasPorData(dados)
    },
    [estera, ntCancelada, ntReprogramada],
  )

  return (
    <NotasContext.Provider
      value={{
        estera,
        equipes,
        gds,
        GDS,
        ntCancelada,
        ntReprogramada,
        c4,
        emergencia,
        faturamento,
        notasByDate,
        notasPorData,
      }}
    >
      {children}
    </NotasContext.Provider>
  )
}
