/* eslint-disable prettier/prettier */
import { addDays, format } from 'date-fns'
import eachDayOfInterval from 'date-fns/fp/eachDayOfInterval'
import {
  addDoc,
  collection,
  deleteDoc,
  doc, setDoc,
  updateDoc
} from 'firebase/firestore'
import {
  ChangeEvent,
  useCallback, useContext, useEffect,
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
import { ModalInfo } from '../../components/ModalInfo'
import { ModalTratativa } from '../../components/ModalTratativa'
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
  Inner,
  Shortcut
} from './styles'
interface ProsModal {
  info: IProsEster
  modal: boolean
}

export function Execucao() {
  const navigate = useNavigate()
  const {estera, ntReprogramada, ntCancelada, gds} = useContext(NotasContext)

  const motionRefParcial = useRef<any>()
  const motionRefCancelada = useRef<any>()


  const motionEst = useRef<any>()
  const motionProc = useRef<any>()
  const motionExec = useRef<any>()
  const motionParc = useRef<any>()
  const motionCanc = useRef<any>()
  const motionRefPreview = useRef<any>()

  const [widthParcial, setWidthParcial] = useState(0)
  const [widthCancelada, setWidthCancelada] = useState(0)
  const [widthPreview, setWidthPreview] = useState(0)
  const [widthEst, setWidthEst] = useState(0)
  const [widthProc, setWidthProc] = useState(0)
  const [widthExec, setWidthExec] = useState(0)
  const [widthParc, setWidthParc] = useState(0)
  const [widthCanc, setWidthCanc] = useState(0)

  const [preview, setPreview] = useState<IProsEster[]>([])
  const [ntParcial, setNtParcial] = useState<IProsEster[]>(ntReprogramada)
  const [file, setFile] = useState<any>(null)
  const [select, setSelect] = useState('esteira')

  const [shortcut, setShortcut] = useState('')

  const [opemModalEsteira, setOpemModalEsteira] = useState<ProsModal>({
    info: {} as IProsEster,
    modal: false,
  })

  const [opemModalInfo, setOpemModalInfo] = useState<ProsModal>({
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
        ntSituation: {
          name: 'Documento SPiR emitido',
          sigla: 'n/a',
          id: 23,
          color1: 'rgba(169, 169, 169, 0.08)',
          color: '#c1c1c1',
        },
        situation: 'estera',
      }
      addDoc(db, nota)
        .then(() => console.log('ok'))
        .catch(() => console.log('erro'))
      dados.push(nota)
    })
  }, [estera, preview])

  const closedModalEsteira = useCallback(() => {
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

  const closedModalInfo = useCallback(() => {
    setOpemModalInfo({
      info: {} as IProsEster,
      modal: false,
    })
  }, [])



  const ListNotas = useMemo(() => {
    const esteira: IProsEster[] = []
    const parcial: IProsEster[] = []
    const cancelada: IProsEster[] = []


    const date = addDays(new Date(dateA), 1)
    const datB = addDays(new Date(dateB), 1)

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

  const SendEncarregado = useCallback(async (id: string) => {
    const cole = collection(fire, 'notas')
    const rf = doc(cole, id)
    updateDoc(rf, {
      situation: 'processo',
    })
  }, [])

  const handleAddParcial = useCallback(async(item: IProsEster) => {

    const cole = collection(fire, 'nt-parcial')
    const rf = doc(cole, item.id)
    
    setDoc(rf, item)
  }, [])

  const handleAddCancelada = useCallback(async(item: IProsEster) => {
    const cole = collection(fire, 'nt-cancelada')
    const rf = doc(cole, item.id)

    setDoc(rf, item)
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
        const rs = h.data.map((p: IProsEster) => {
          const mo = String(p.MO).replace(/[^0-9]/g, '')
          return {
            ...p,
            MO: Number(mo) / 100,
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

    switch (shortcut) {
      case 'baseConcroll':
        setWidthEst(motionEst.current!.scrollWidth - motionEst.current!.offsetWidth)
        setWidthProc(motionProc.current!.scrollWidth - motionProc.current!.offsetWidth)
        console.log('esteira')
        break

      case 'partial':
        setWidthParc(motionParc.current!.scrollWidth - motionParc.current!.offsetWidth)

        break

      case 'finish':
      setWidthExec(motionExec.current!.scrollWidth - motionExec.current!.offsetWidth)

        break

      case 'cancel':
      setWidthCanc(motionCanc.current!.scrollWidth - motionCanc.current!.offsetWidth)

        break

      case 'map':
        console.log('ok')
      break
      
      default:
        console.log(`Sorry, we are out of ${shortcut} .`);
    }

    switch(select) {
      case 'parcial':
        setWidthParcial(motionRefParcial.current!.scrollWidth - motionRefParcial.current!.offsetWidth)

      break

      case 'cancelada':
        setWidthCancelada(motionRefCancelada.current!.scrollWidth - motionRefCancelada.current!.offsetWidth)

      break

      case 'esteria':
      break

      case '':
      
      break

      default: 
        console.log('select nao encontrada')
    }

    
    
    setWidthPreview(
      motionRefPreview.current!.scrollWidth -
        motionRefPreview.current!.offsetWidth,
    )

    
  }, [preview, ListNotas, ntParcial, estera, ntCancelada, shortcut, select])


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
        <EditNotaExec closed={closedModalEsteira} nota={opemModalEsteira.info} />
      </Modal>

      <Modal ariaHideApp={false} isOpen={opemModalTratativa.modal} >
        <ModalTratativa closed={closedModalTratativa} nota={opemModalTratativa.info}  />
      </Modal>

      <Modal ariaHideApp={false} isOpen={opemModalInfo.modal} >
        <ModalInfo closed={closedModalInfo} nota={opemModalInfo.info}  />
      </Modal>

      <File>
        <ContainerFile>
          <input type="file" onChange={handleFile} />
          <Botao title="savar notas" pres={submit} />
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

          
          <Botao
            variant="primary"
            title="Frota"
            pres={() => navigate('/editGds')}
          />
        </ContainerButton>
      </File>

      {select === 'esteira' && (
        <Shortcut>
          <Botao pres={() => setShortcut('baseConcroll')} title='Controle base' />
          <Botao pres={() => setShortcut('finish')} title='Notas finalizadas' />
          <Botao pres={() => setShortcut('partial')} title='Notas parciais' />
          <Botao pres={() => setShortcut('cancel')} title='Notas canceladas' />
          <Botao pres={() => setShortcut('map')} title='Mapa geral' />
          <Botao pres={() => navigate('/aderencia')} title='Aderência' />

          {/* <input type="text" placeholder='digite a cidade desejada' /> */}
        </Shortcut>

      )}


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
          {shortcut === 'baseConcroll' && (
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
                          submit={() => SendEncarregado(nt.id)}
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
                          // deletar={() => navigate('/planejamento')}
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

          {shortcut === 'map' && (
            <div>
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

            </div>
          )}

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
                        title2='info'
                        submit={() => SendEncarregado(nt.id)}
                        key={nt.id}
                        nota={nt}
                        pres={() => {
                          setOpemModalInfo({ info: nt, modal: true })
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
                          title2='editar'
                          title1='enviar'
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

        </div>
      )}

      {/* NOTA PARCIAL TRATADA */}
      {select === 'parcial' && (
        <ContainerCards>
          <p>Notas parciais</p>
          <Carousel whileTap={{ cursor: 'grabbing' }}>
            <Inner
              ref={motionRefParcial}
              drag="x"
              dragConstraints={{ right: 0, left: - widthParcial }}
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
              ref={motionRefCancelada}
              drag="x"
              dragConstraints={{ right: 0, left: -widthCancelada }}
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
