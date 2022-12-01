/* eslint-disable prettier/prettier */
import { addDays, format } from 'date-fns'
import eachDayOfInterval from 'date-fns/fp/eachDayOfInterval'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import { api } from '../../api'
import { Botao } from '../../components/Button'
import { Cards } from '../../components/Cards'
import { EditNotaExec } from '../../components/EditNotaExec'
import { Header } from '../../components/Header'
import { Map } from '../../components/Map'
import { ModalTratativa } from '../../components/ModalTratativa'
import { fire } from '../../config/firebase'
import { IProsEster } from '../../dtos'
import {
  Carousel,
  Container,
  ContainerButton,
  ContainerCards,
  ContainerFile,
  File,
  Inner,
  Shortcut
} from './styles'
interface ProsModal {
  info: IProsEster
  modal: boolean
}

export function Execucao() {
  const navigate = useNavigate()

  const motionRef = useRef<any>()
  const motionEst = useRef<any>()
  const motionProc = useRef<any>()
  const motionExec = useRef<any>()
  const motionParc = useRef<any>()
  const motionCanc = useRef<any>()
  const motionRefPreview = useRef<any>()

  const [width, setWidth] = useState(0)
  const [widthPreview, setWidthPreview] = useState(0)
  const [widthEst, setWidthEst] = useState(0)
  const [widthProc, setWidthProc] = useState(0)
  const [widthExec, setWidthExec] = useState(0)
  const [widthParc, setWidthParc] = useState(0)
  const [widthCanc, setWidthCanc] = useState(0)

  const [preview, setPreview] = useState<IProsEster[]>([])
  const [estera, setEstera] = useState<IProsEster[]>([])
  const [ntParcial, setNtParcial] = useState<IProsEster[]>([])
  const [ntCancelada, setNtCancelada] = useState<IProsEster[]>([])
  const [file, setFile] = useState<any>(null)
  const [select, setSelect] = useState('parcial')

  const [shortcut, setShortcut] = useState('')

  const [opemModalEsteira, setOpemModalEsteira] = useState<ProsModal>({
    info: {} as IProsEster,
    modal: false,
  })

  const [opemModalTratativa, setOpemModalTratativa] = useState<ProsModal>({
    info: {} as IProsEster,
    modal: false
  })

  const [dateA, setDateA] = useState('')
  const [dateB, setDateB] = useState('')
  const [search, setSearch] = useState('')

  const [modal, setModal] = useState(false)

  const db = collection(fire, 'notas')
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

  const closedModalTratativa = useCallback(() => {
    setOpemModalTratativa({
      info: {} as IProsEster,
      modal: false,
    })
  }, [])

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

    const filEst = search !== ''
    ? esteira.filter(h => h.Nota.includes(search)) 
    : esteira

    const filParc = search !== ''
    ? parcial.filter(h => h.Nota.includes(search)) 
    : parcial

    const filcanc = search !== ''
    ? cancelada.filter(h => h.Nota.includes(search)) 
    : cancelada

    const proc = filEst.filter(h => h.situation === 'estera')
    const exec = filEst.filter(h => h.situation === 'processo')
    const execP = filEst.filter(h => h.situation === 'parcial')
    const execE = filEst.filter(h => h.situation === 'executada')
    const execC = filEst.filter(h => h.situation === 'cancelada')

    return {
      esteira,
      proc,
      exec,
      execP,
      execE,
      execC,
      parc: filParc,
      canc: filcanc,
    }
  }, [dateA, dateB, estera, ntCancelada, ntParcial, search])

  const upload = useCallback(async (id: string) => {
    const cole = collection(fire, 'notas')
    const rf = doc(cole, id)
    updateDoc(rf, {
      situation: 'processo',
    })
  }, [])

  const handleAddParcial = useCallback(async(item: IProsEster) => {
    const cole = collection(fire, 'nt-parcial')
    const rf = doc(cole, item.id)

    const dados = {
      ...item,
      updateAt: format(new Date(), 'dd/MM/yyyy')
    }

    setDoc(rf, dados)
  }, [])

  const handleAddCancelada = useCallback(async(item: IProsEster) => {
    const cole = collection(fire, 'nt-cancelada')
    const rf = doc(cole, item.id)

    const dados = {
      ...item,
      updateAt: format(new Date(), 'dd/MM/yyyy')
    }

    setDoc(rf, dados)
  }, [])

  const handleFile = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    setPreview([])
    if (e.target.files) {
      const fl = e.target.files[0]
      const data = new FormData()

      data.append('csv', fl)

      await api
        .post('/post/csv', data)
        .then((h) => {
          setPreview(h.data)
        })
        .catch((h) => console.log(h))
      // setFile(e.target.files[0])
    }
  }, [])

  useEffect(() => {

    if(select === 'parcial') {
      setWidth(motionRef.current!.scrollWidth - motionRef.current!.offsetWidth)

    } else {
      setWidthEst(motionEst.current!.scrollWidth - motionEst.current!.offsetWidth)
      setWidthProc(motionProc.current!.scrollWidth - motionProc.current!.offsetWidth)
      setWidthParc(motionParc.current!.scrollWidth - motionParc.current!.offsetWidth)
      setWidthCanc(motionCanc.current!.scrollWidth - motionCanc.current!.offsetWidth)
      setWidthExec(motionExec.current!.scrollWidth - motionExec.current!.offsetWidth)
      setWidthPreview(
        motionRefPreview.current!.scrollWidth -
          motionRefPreview.current!.offsetWidth,
      )

    }

    
  }, [preview, ListNotas, ntParcial, estera, ntCancelada])


  const deletNota = useCallback(async(id: string) => {
    const cl = collection(fire, 'notas')
    const rf = doc(cl, id)
    deleteDoc(rf)
  }, [])

  const resgatar = useCallback((id: string) => {
    const cole = collection(fire, 'notas')
    const rf = doc(cole, id)

    updateDoc(rf, {
      situation: 'estera'
    })
  }, [])

  return (
    <Container>
      <Header
        value={(h: string) => setSearch(h)}
        dateA={(h: string) => setDateA(h)}
        dateB={(h: string) => setDateB(h)}
      />

      <Modal ariaHideApp={false} isOpen={opemModalEsteira.modal}>
        <EditNotaExec closed={closedModalInfo} nota={opemModalEsteira.info} />
      </Modal>

      <Modal ariaHideApp={false} isOpen={opemModalTratativa.modal} >
        <ModalTratativa closed={closedModalTratativa} nota={opemModalTratativa.info}  />
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

      <Shortcut>
        <Botao pres={() => setShortcut('baseCroncroll')} title='Controle base' />
        <Botao pres title='Mapa geral' />
        <Botao title='Notas finalizadas' />
        <Botao title='Notas parciais' />
        <Botao title='Notas canceladas' />

        <input type="text" placeholder='digite a cidade desejada' />
      </Shortcut>

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
                  key={nt.id}
                  nota={nt}
                />
              ))}
            </div>
          </Inner>
        </Carousel>
      </ContainerCards>

      {/* ESTEIRA */}
      {select === 'esteira' && (
        <div>
          {shortcut === 'baseCroncroll' && (
            <div>

              {/* PROCESSO */}
              <ContainerCards>
                {ListNotas.proc.length > 0 && (
                  <h3 style={{marginBottom: 5, marginTop: 15}} >Notas na base</h3>
                )}
                <Carousel whileTap={{ cursor: 'grabbing' }}>
                  <Inner
                    ref={motionEst}
                    drag="x"
                    dragConstraints={{ right: 0, left: -widthEst }}
                  >
                    <div style={{ display: 'flex' }}>
                      {ListNotas.proc.map((nt) => (
                        <Cards
                          deletar={() => deletNota(nt.id)}
                          submit={() => upload(nt.id)}
                          key={nt.id}
                          nota={nt}
                          pres={() => {
                            setOpemModalEsteira({ info: nt, modal: true })
                          }}
                        />
                      ))}
                    </div>
                  </Inner>
                </Carousel>
              </ContainerCards>

                {/* EXECUCAO */}
              <ContainerCards>
              {ListNotas.exec.length > 0 && (
                <h3 style={{marginBottom: 5, marginTop: 15}} >Notas com os encarregados</h3>
                )}

                <Carousel whileTap={{ cursor: 'grabbing' }}>
                  <Inner
                    ref={motionProc}
                    drag="x"
                    dragConstraints={{ right: 0, left: -widthProc }}
                  >
                    <div style={{ display: 'flex' }}>
                      {ListNotas.exec.map((nt) => (
                        <Cards
                          title1='resgatar'
                          title2='info'
                          title3='deletar'
                          deletar={() => navigate('/planejamento')}
                          submit={() => resgatar(nt.id)}
                          key={nt.id}
                          nota={nt}
                          pres={() => {
                            setOpemModalEsteira({ info: nt, modal: true })
                          }}
                        />
                      ))}
                    </div>
                  </Inner>
                </Carousel>
              </ContainerCards>
            </div>

          )}

          {/* {shortcut === 'map' && ()} */}

          {shortcut === 'finish' && (
            <ContainerCards>
              {ListNotas.execE.length > 0 && (
                <h3 style={{marginBottom: 5, marginTop: 15}} >Notas Finalizadas</h3>
                )}
              
              <Carousel whileTap={{ cursor: 'grabbing' }}>
                <Inner
                  ref={motionExec}
                  drag="x"
                  dragConstraints={{ right: 0, left: -widthExec }}
                >
                  <div style={{ display: 'flex' }}>
                    {ListNotas.execE.map((nt) => (
                      <Cards
                        deletar={() => navigate('/planejamento')}
                        submit={() => upload(nt.id)}
                        key={nt.id}
                        nota={nt}
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
          {shortcut === 'partial' && (
              <ContainerCards>
                {ListNotas.execP.length > 0 && (
                  <h3 style={{marginBottom: 5, marginTop: 15}} >Notas parciais</h3>
                  )}
                <Carousel whileTap={{ cursor: 'grabbing' }}>
                  <Inner
                    ref={motionParc}
                    drag="x"
                    dragConstraints={{ right: 0, left: -widthParc }}
                  >
                    <div style={{ display: 'flex' }}>
                      {ListNotas.execP.map((nt) => (
                        <Cards
                          deletar={() => deletNota(nt.id)}
                          submit={() => handleAddParcial(nt)}
                          key={nt.id}
                          nota={nt}
                          pres={() => {
                            setOpemModalTratativa({ info: nt, modal: true })
                          }}
                        />
                      ))}
                    </div>
                  </Inner>
                </Carousel>
              </ContainerCards>
          )}
          {shortcut === 'cancel' && (
                 <ContainerCards>
                 {ListNotas.execP.length > 0 && (
                   <h3 style={{marginBottom: 5, marginTop: 15}} >Notas canceladas</h3>
                   )}
                   <Carousel whileTap={{ cursor: 'grabbing' }}>
                     <Inner
                       ref={motionCanc}
                       drag="x"
                       dragConstraints={{ right: 0, left: -widthCanc }}
                     >
                       <div style={{ display: 'flex' }}>
                         {ListNotas.execC.map((nt) => (
                           <Cards
                             deletar={() => deletNota(nt.id)}
                             submit={() => handleAddCancelada(nt)}
                             key={nt.id}
                             nota={nt}
                             pres={() => {
                               setOpemModalTratativa({ info: nt, modal: true })
                             }}
                           />
                         ))}
                       </div>
                     </Inner>
                   </Carousel>
                 </ContainerCards>
          )}

  

          {/* PARCIAL */}
        

          {/* CANCELADA  */}
     
        </div>
      )}

      {/* NOTA PARCIAL TRATADA */}
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
        <h3 style={{marginBottom: 5, marginTop: 15}} >Mapa geral das notas</h3>
      </div>

      {select === 'esteira' && (
        <div>
          {ListNotas.esteira.map((h) => (
            <Map
              key={h.id}
              nota={h.Nota}
              data={h.Dt_programação}
              mo={h.MO}
              equipes={h.EQUIPE || []}
              cidade={h.cidade}
              obs={h.obsExecuçao || ''}
              encarregado={h.SUPERVISOR || ''}
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
