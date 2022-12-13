import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, { useRef } from 'react'
import { Header } from '../../components/Header'
import { NotasContext } from '../../context/ListNotas'
import { theme } from '../../theme/theme'
import { BoxChart, Container } from './styles'

export function Aderencia() {
  const { notasByDate, notasPorData } = React.useContext(NotasContext)

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null)
  const [dateA, setDateA] = React.useState('')
  const [dateB, setDateB] = React.useState('')
  const [value, setValue] = React.useState('')

  React.useEffect(() => {
    notasByDate(new Date(dateA), new Date(dateB))
  }, [dateA, dateB, notasByDate])

  const nt = React.useMemo(() => {
    const planejado = notasPorData.pla ? notasPorData.pla : []
    const executado = notasPorData.exe ? notasPorData.exe : []
    const parcial = notasPorData.par ? notasPorData.par : []
    const cancelada = notasPorData.canc ? notasPorData.canc : []

    const supervisor = {
      Adelino: {
        planejado: planejado.filter((h) => h.SUPERVISOR === 'Adelino').length,
        executado: executado.filter((h) => h.SUPERVISOR === 'Adelino').length,
        parcial: parcial.filter((h) => h.SUPERVISOR === 'Adelino').length,
        cancelada: cancelada.filter((h) => h.SUPERVISOR === 'Adelino').length,
      },

      Diego: {
        planejado: planejado.filter((h) => h.SUPERVISOR === 'Diego').length,
        executado: executado.filter((h) => h.SUPERVISOR === 'Diego').length,
        parcial: parcial.filter((h) => h.SUPERVISOR === 'Diego').length,
        cancelada: cancelada.filter((h) => h.SUPERVISOR === 'Diego').length,
      },

      Douglas: {
        planejado: planejado.filter((h) => h.SUPERVISOR === 'Douglas').length,
        executado: executado.filter((h) => h.SUPERVISOR === 'Douglas').length,
        parcial: parcial.filter((h) => h.SUPERVISOR === 'Douglas').length,
        cancelada: cancelada.filter((h) => h.SUPERVISOR === 'Douglas').length,
      },

      Paulo: {
        planejado: planejado.filter((h) => h.SUPERVISOR === 'Paulo').length,
        executado: executado.filter((h) => h.SUPERVISOR === 'Paulo').length,
        parcial: parcial.filter((h) => h.SUPERVISOR === 'Paulo').length,
        cancelada: cancelada.filter((h) => h.SUPERVISOR === 'Paulo').length,
      },
    }

    const data = [
      {
        x: `Aldelino - Notas recebidas ${supervisor.Adelino.planejado}`,
        y: supervisor.Adelino.executado,
        label: supervisor.Adelino.executado,
      },
      {
        x: `Diego - Notas recebidas ${supervisor.Diego.planejado}`,
        y: supervisor.Diego.executado,
        label: supervisor.Diego.executado,
      },
      {
        x: `Douglas - Notas recebidas ${supervisor.Douglas.planejado}`,
        y: supervisor.Douglas.executado,
        label: supervisor.Douglas.executado,
      },

      {
        x: `Paulo - Notas recebidas ${supervisor.Paulo.planejado}`,
        y: supervisor.Paulo.executado,
        label: supervisor.Paulo.executado,
      },
    ]

    const dataP = [
      {
        x: `Aldelino - Notas recebidas ${supervisor.Adelino.planejado}`,
        y: supervisor.Adelino.parcial,
        label: supervisor.Adelino.parcial,
      },
      {
        x: `Diego - Notas recebidas ${supervisor.Diego.planejado}`,
        y: supervisor.Diego.parcial,
        label: supervisor.Diego.parcial,
      },
      {
        x: `Douglas - Notas recebidas ${supervisor.Douglas.planejado}`,
        y: supervisor.Douglas.parcial,
        label: supervisor.Douglas.parcial,
      },

      {
        x: `Paulo - Notas recebidas ${supervisor.Paulo.planejado}`,
        y: supervisor.Paulo.parcial,
        label: supervisor.Paulo.parcial,
      },
    ]

    const dataC = [
      {
        x: `Aldelino - Notas recebidas ${supervisor.Adelino.planejado}`,
        y: supervisor.Adelino.cancelada,
        label: supervisor.Adelino.cancelada,
      },
      {
        x: `Diego ${supervisor.Diego.planejado}`,
        y: supervisor.Diego.cancelada,
        label: supervisor.Diego.cancelada,
      },
      {
        x: `Douglas ${supervisor.Douglas.planejado}`,
        y: supervisor.Douglas.cancelada,
        label: supervisor.Douglas.cancelada,
      },

      {
        x: `Paulo ${supervisor.Paulo.planejado}`,
        y: supervisor.Paulo.cancelada,
        label: supervisor.Paulo.cancelada,
      },
    ]

    const dados = {
      dataC,
      dataP,
      data,
      tExec: executado.length,
      tParc: parcial.length,
      tCanc: cancelada.length,
    }

    return dados
  }, [notasPorData])

  // const ntGlbal = React.useMemo(() => {
  //   const res = estera.map((h) => {
  //     const tl = Number(h.MO)

  //     const total = tl.toLocaleString('pt-BR', {
  //       style: 'currency',
  //       currency: 'BRL',
  //     })
  //     return {
  //       ...h,
  //       MO: tl,
  //       price: total,
  //     }
  //   })

  //   const filterWihDate = []

  //   if (date.getTime() <= dateB.getTime()) {
  //     const ruslt = eachDayOfInterval({
  //       start: date,
  //       end: dateB,
  //     })

  //     ruslt.forEach((dt) => {
  //       const fomatDt = format(dt, 'dd/MM/yyyy')
  //       res.forEach((item) => {
  //         if (fomatDt === item.Dt_programação) {
  //           filterWihDate.push(item)
  //         }
  //       })
  //     })
  //   }

  //   const nota = filterWihDate.length > 0 ? filterWihDate : res

  //   // const pr = Number(h.MO) * h.PORCENTUAL;
  //   // const total = pr.toLocaleString("pt-BR", {
  //   //   style: "currency",
  //   //   currency: "BRL",
  //   // });

  //   const notaTotal = nota.reduce((ac: number, h) => {
  //     return (ac += Number(h.MO))
  //   }, 0)

  //   const subTotal: PropsPip[] = []

  //   categoria.forEach((cat) => {
  //     let notaN = ''
  //     let sum = 0
  //     nota.forEach((item: IProsEster) => {
  //       if (cat.name === item.situation) {
  //         const porcent = item.PORCENTUAL || 0
  //         sum += Number(item.MO) - item.MO * porcent
  //         notaN = item.Nota
  //       }
  //     })

  //     const totalF = sum.toLocaleString('pt-BR', {
  //       style: 'currency',
  //       currency: 'BRL',
  //     })

  //     const prc = ((sum / notaTotal) * 100).toFixed(0)

  //     const percent = `${prc}%`

  //     subTotal.push({
  //       nota: notaN,
  //       total: sum,
  //       totalFormated: totalF,
  //       situation: cat.name,
  //       color: cat.color,
  //       percent,
  //     })
  //   })

  //   return subTotal
  // }, [estera, date, dateB])

  const options: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Aderência dos encarregados',
    },
    xAxis: {
      categories: nt.data.map((h) => h.x),
    },

    credits: {
      enabled: false,
    },

    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y:1f}',
        },
      },
    },

    series: [
      {
        type: 'column',
        data: nt.data.map((h) => h.y),
        name: 'Notas finalizadas',
        color: theme.color.green[10],
      },

      {
        type: 'column',
        data: nt.dataP.map((h) => h.y),
        name: 'Notas parciais',
        color: theme.color.orange[10],
      },

      {
        type: 'column',
        data: nt.dataC.map((h) => h.y),
        name: 'Notas canceladas',
        color: theme.color.red[10],
      },

      {
        type: 'pie',
        name: 'Total',
        data: [
          {
            name: '2020',
            y: nt.tCanc,
            color: theme.color.red[10], // 2020 color
            dataLabels: {
              enabled: true,
              distance: -50,
              format: '{point.total} N',
              style: {
                fontSize: '15px',
              },
            },
          },
          {
            name: '2021',
            y: nt.tExec,
            color: theme.color.green[10], // 2021 color
          },
          {
            name: 'nota parcial',
            y: nt.tParc,
            color: theme.color.orange[10], // 2022 color
          },
        ],
        center: [20, 25],
        size: 100,
        innerSize: '70%',
        showInLegend: false,
        dataLabels: {
          enabled: false,
        },
      },
    ],
  }

  return (
    <Container>
      <Header
        value={(h) => setValue(h)}
        dateA={(h) => setDateA(h)}
        dateB={(h) => setDateB(h)}
      />
      <p>hello</p>

      <BoxChart>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartComponentRef}
        />

        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartComponentRef}
        />
      </BoxChart>
    </Container>
  )
}
