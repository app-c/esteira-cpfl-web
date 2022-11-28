import { addDays, format } from 'date-fns'
import eachDayOfInterval from 'date-fns/fp/eachDayOfInterval'
import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import {
  ChangeEvent,
  useCallback,
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
    return {
      est: esteira,
      parc: parcial,
      canc: cancelada,
    }
  }, [dateA, dateB, estera, ntCancelada, ntParcial])

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
          setPreview(h.data)
        })
        .catch((h) => console.log(h))
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

  return (
    <Container>
      <Header
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
                <Cards
                  equipe={nt.EQUIPE || []}
                  key={nt.id}
                  nota={nt.Nota}
                  valor={nt.MO}
                  data={nt.Dt_programação}
                />
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
                    equipe={nt.EQUIPE || []}
                    deletar={() => {}}
                    submit={upload}
                    key={nt.id}
                    nota={nt.Nota}
                    valor={nt.MO}
                    data={nt.Dt_programação}
                    pres={() => {
                      setOpemModalEsteira({ info: nt, modal: true })
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
                    equipe={nt.EQUIPE || []}
                    deletar={() => {}}
                    submit={() => {}}
                    key={nt.id}
                    nota={nt.Nota}
                    valor={nt.MO}
                    data={nt.Dt_programação}
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
                    equipe={nt.EQUIPE || []}
                    deletar={() => {}}
                    submit={() => {}}
                    key={nt.id}
                    nota={nt.Nota}
                    valor={nt.MO}
                    data={nt.Dt_programação}
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
              obs={h.OBSERVACAO || ''}
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
              obs={h.OBSERVACAO || ''}
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
              obs={h.OBSERVACAO || ''}
              tes={h.TLE}
            />
          ))}
        </div>
      )}
    </Container>
  )
}
