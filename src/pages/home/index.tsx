import { addDays, format } from 'date-fns'
import eachDayOfInterval from 'date-fns/fp/eachDayOfInterval'
import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import Modal from 'react-modal'
import { api } from '../../api'
import { Botao } from '../../components/Button'
import { Cards } from '../../components/Cards'
import { EditNota } from '../../components/EditNota'
import { Header } from '../../components/Header'
import { Map } from '../../components/Map'
import { fire } from '../../config/firebase'
import { NotasContext } from '../../context/ListNotas'
import { IProsEster } from '../../dtos'
import {
  Carousel,
  Container,
  ContainerButton,
  ContainerCards,
  ContainerFile,
  File,
  Inner
} from './styles'

interface ProsModal {
  info: IProsEster
  modal: boolean
}

export function Home() {
  const { gds } = useContext(NotasContext)
  const motionRef = useRef<any>()
  const motionRefPreview = useRef<any>()
  const [width, setWidth] = useState(0)
  const [widthPreview, setWidthPreview] = useState(0)

  const [notas, setNotas] = useState<IProsEster[]>([])
  const [preview, setPreview] = useState<IProsEster[]>([])
  const [estera, setEstera] = useState<IProsEster[]>([])
  const [ntParcial, setNtParcial] = useState<IProsEster[]>([])
  const [ntCancelada, setNtCancelada] = useState<IProsEster[]>([])
  const [file, setFile] = useState<any>(null)
  const [select, setSelect] = useState('esteira')

  const [opemModalEsteira, setOpemModalEsteira] = useState<ProsModal>({
    info: {} as IProsEster,
    modal: false,
  })

  const [dateA, setDateA] = useState('')
  const [dateB, setDateB] = useState('')
  const [search, setSearch] = useState('')

  const [modal, setModal] = useState(false)

  const db = collection(fire, 'planejamento')
  const dp = collection(fire, 'nt-parcial')
  const dc = collection(fire, 'nt-cancelada')

  const submit = useCallback(async () => {
    setPreview([])
    setFile(null)

    const dados: IProsEster[] = []
    preview.forEach((est) => {
      let nota = {} as IProsEster

      nota = {
        ...est,
        EQUIPE: [],
        situation: 'estera',
      }
      addDoc(db, nota)
        .then(() => console.log('ok'))
        .catch(() => console.log('erro'))
      dados.push(nota)
    })
  }, [estera, preview])

  const closedModalInfo = useCallback(() => {
    setOpemModalEsteira({
      info: {} as IProsEster,
      modal: false,
    })
  }, [])
  console.log(opemModalEsteira.modal)

  useEffect(() => {
    onSnapshot(db, (h) => {
      const rs = h.docs
        .map((p) => {
          return {
            ...p.data(),
            id: p.id,
          } as IProsEster
        })
        .sort((a, b) => {
          if (b.Dt_programação > a.Dt_programação) {
            return -1
          }
          return 0
        })

      setEstera(rs)
    })

    onSnapshot(dp, (h) => {
      const rs = h.docs.map((p) => {
        return {
          ...p.data(),
          id: p.id,
        } as IProsEster
      })
      const res = rs.sort((a, b) => {
        if (b.Dt_programação > a.Dt_programação) {
          return -1
        }
        return 0
      })

      setNtParcial(res)
    })

    onSnapshot(dc, (h) => {
      const rs = h.docs.map((p) => {
        return {
          ...p.data(),
          id: p.id,
        } as IProsEster
      })
      const res = rs.sort((a, b) => {
        if (b.Dt_programação > a.Dt_programação) {
          return -1
        }
        return 0
      })

      setNtCancelada(res)
    })
  }, [])

  const ListNotas = useMemo(() => {
    const esteira: IProsEster[] = []
    const parcial: IProsEster[] = []
    const cancelada: IProsEster[] = []

    const date = addDays(new Date(dateA), 1)
    const datB = addDays(new Date(dateB), 1)
    console.log(dateA)

    if (date.getTime() <= datB.getTime()) {
      const ruslt = eachDayOfInterval({
        start: date,
        end: datB,
      })

      ruslt.forEach((dt) => {
        const fomatDt = format(dt, 'dd/MM/yyyy')
        estera.forEach((item) => {
          if (fomatDt === item.Dt_programação) {
            esteira.push(item)
          }
        })

        ntParcial.forEach((item) => {
          if (fomatDt === item.Dt_programação) {
            parcial.push(item)
          }
        })

        ntCancelada.forEach((item) => {
          if (fomatDt === item.Dt_programação) {
            cancelada.push(item)
          }
        })
      })
    }

    const est =
      search !== '' ? esteira.filter((h) => h.Nota.includes(search)) : esteira

    const parc =
      search !== '' ? parcial.filter((h) => h.Nota.includes(search)) : parcial

    const canc =
      search !== ''
        ? cancelada.filter((h) => h.Nota.includes(search))
        : cancelada

    return {
      est,
      parc,
      canc,
    }
  }, [dateA, dateB, estera, ntCancelada, ntParcial, search])

  const upload = useCallback(async () => {
    // const cole = collection(fire, 'planejamento')
    // ListNotas.est.forEach((h) => {
    //   const rf = doc(cole, h.id)
    //   setDoc(rf, h)
    // })
  }, [ListNotas])

  const handleFile = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    setPreview([])
    if (e.target.files) {
      const fl = e.target.files[0]
      const data = new FormData()

      data.append('csv', fl)

      await api
        .post('/', data)
        .then((h) => {
          const rs = h.data.map((p: IProsEster) => {
            return {
              ...p,
              situation: 'preview',
            }
          })
          setPreview(rs)
        })
        .catch((h) => console.log(h.response))
      // setFile(e.target.files[0])
    }
  }, [])

  useEffect(() => {
    setWidth(motionRef.current!.scrollWidth - motionRef.current!.offsetWidth)
    setWidthPreview(
      motionRefPreview.current!.scrollWidth -
        motionRefPreview.current!.offsetWidth,
    )
  }, [preview, ListNotas, ntParcial, estera, ntCancelada])

  const openModaEdit = useCallback(
    (nt: IProsEster) => {
      const cole = collection(fire, 'gds')
      const upDd = []
      const fil = gds.filter((h) => h.data === nt.Dt_programação)
      const gd = gds.filter((h) => h.data === '00/00/0000')

      console.log(fil.length)
      if (fil.length === 0) {
        gd.forEach((h) => {
          const dt = {
            ...h,
            data: nt.Dt_programação,
          }
          addDoc(cole, dt).then(() => console.log('ok'))
        })
      }
      setOpemModalEsteira({ info: nt, modal: true })
    },
    [gds],
  )

  return (
    <Container>
      <Header
        value={(h: string) => setSearch(h)}
        dateA={(h: string) => setDateA(h)}
        dateB={(h: string) => setDateB(h)}
      />

      <Modal ariaHideApp={false} isOpen={opemModalEsteira.modal}>
        <EditNota closed={closedModalInfo} nota={opemModalEsteira.info} />
      </Modal>

      <File>
        <ContainerFile>
          <input type="file" onChange={handleFile} />
          <Botao title="upload notas" pres={submit} />
        </ContainerFile>

        <ContainerButton>
          <Botao
            variant="secundary"
            title="Minha esteira"
            pres={() => setSelect('esteira')}
          />
          <Botao
            variant="secundary"
            title="Notas parciais"
            pres={() => setSelect('parcial')}
          />
          <Botao
            variant="secundary"
            title="notas canceladas"
            pres={() => setSelect('cancelada')}
          />
        </ContainerButton>
      </File>

      <div
        style={{
          padding: 10,
          display: 'flex',
          marginTop: 10,
          marginBottom: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <label></label>
      </div>

      {/* PREVIEW */}
      <ContainerCards style={{ marginBottom: 20 }}>
        {preview.length > 0 && <p>Pré visualização</p>}
        <Carousel whileTap={{ cursor: 'grabbing' }}>
          <Inner
            ref={motionRefPreview}
            drag="x"
            dragConstraints={{ right: 0, left: -widthPreview }}
          >
            <div style={{ display: 'flex' }}>
              {preview.map((nt) => (
                <Cards key={nt.id} nota={nt} />
              ))}
            </div>
          </Inner>
        </Carousel>
      </ContainerCards>

      {/* ESTEIRA */}
      {select === 'esteira' && (
        <ContainerCards>
          <p>Minha esteira</p>
          <Carousel whileTap={{ cursor: 'grabbing' }}>
            <Inner
              ref={motionRef}
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
            >
              <div style={{ display: 'flex' }}>
                {ListNotas.est.map((nt) => (
                  <Cards
                    deletar={() => {}}
                    submit={upload}
                    key={nt.id}
                    nota={nt}
                    pres={() => {
                      openModaEdit(nt)
                    }}
                  />
                ))}
              </div>
            </Inner>
          </Carousel>
        </ContainerCards>
      )}

      {/* PARCIAL */}
      {select === 'parcial' && (
        <ContainerCards>
          <p>Notas parciais</p>
          <Carousel whileTap={{ cursor: 'grabbing' }}>
            <Inner
              ref={motionRef}
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
            >
              <div style={{ display: 'flex' }}>
                {ListNotas.parc.map((nt) => (
                  <Cards
                    deletar={() => {}}
                    submit={() => {}}
                    key={nt.id}
                    nota={nt}
                    pres={() => {}}
                  />
                ))}
              </div>
            </Inner>
          </Carousel>
        </ContainerCards>
      )}

      {/* CANCELADA  */}
      {select === 'cancelada' && (
        <ContainerCards>
          <p>Notas canceladas</p>
          <Carousel whileTap={{ cursor: 'grabbing' }}>
            <Inner
              ref={motionRef}
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
            >
              <div style={{ display: 'flex' }}>
                {ListNotas.canc.map((nt) => (
                  <Cards
                    deletar={() => {}}
                    submit={() => {}}
                    key={nt.id}
                    nota={nt}
                    pres={() => {}}
                  />
                ))}
              </div>
            </Inner>
          </Carousel>
        </ContainerCards>
      )}

      <div
        style={{
          alignSelf: 'center',
          marginTop: 30,
        }}
      >
        <h3>Mapa geral das notas</h3>
      </div>

      {select === 'esteira' && (
        <div>
          {ListNotas.est.map((h) => (
            <Map
              key={h.id}
              nota={h.Nota}
              data={h.Dt_programação}
              mo={h.MO}
              equipes={h.EQUIPE || []}
              cidade={h.cidade}
              encarregado={h.SUPERVISOR || ''}
              obs={h.obsExecuçao || ''}
              tes={h.TLE}
            />
          ))}
        </div>
      )}

      {select === 'parcial' && (
        <div>
          {ListNotas.parc.map((h) => (
            <Map
              key={h.id}
              nota={h.Nota}
              data={h.Dt_programação}
              mo={h.MO}
              cidade={h.cidade}
              encarregado={h.SUPERVISOR || ''}
              equipes={h.EQUIPE || []}
              obs={h.obsExecuçao || ''}
              tes={h.TLE}
            />
          ))}
        </div>
      )}

      {select === 'cancelada' && (
        <div>
          {ListNotas.canc.map((h) => (
            <Map
              key={h.id}
              nota={h.Nota}
              data={h.Dt_programação}
              mo={h.MO}
              cidade={h.cidade}
              equipes={h.EQUIPE || []}
              encarregado={h.SUPERVISOR || ''}
              obs={h.obsExecuçao || ''}
              tes={h.TLE}
            />
          ))}
        </div>
      )}
    </Container>
  )
}
function useContex() {
  throw new Error('Function not implemented.')
}
