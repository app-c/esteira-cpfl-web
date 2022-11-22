import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { Cards } from '../../components/Cards'
import { Header } from '../../components/Header'
import {
  onSnapshot,
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore'
import { fire } from '../../config/firebase'
import {
  Carousel,
  Container,
  ContainerCards,
  Inner,
  File,
  ContainerFile,
  ContainerButton,
} from './styles'
import { Botao } from '../../components/Button'
import { IProsEster } from '../../dtos'
import { api } from '../../api'
import Modal from 'react-modal'
import { Map } from '../../components/Map'

export function Home() {
  const motionRef = useRef<any>()
  const [notas, setNotas] = useState<IProsEster[]>([])
  const [preview, setPreview] = useState<IProsEster[]>([])
  const [estera, setEstera] = useState<IProsEster[]>([])
  const [ntParcial, setNtParcial] = useState<IProsEster[]>([])
  const [ntCancelada, setNtCancelada] = useState<IProsEster[]>([])
  const [width, setWidth] = useState(0)
  const [file, setFile] = useState<any>(null)
  const [select, setSelect] = useState('esteira')

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
      estera.forEach((nt) => {
        if (est.Nota === nt.Nota) {
          nota = {
            ...nt,
            Dt_programação: est.Dt_programação,
            EQUIPE: est.EQUIPE || [],
          }
        }
      })

      if (nota.Nota === est.Nota) {
        dados.push(nota)
      } else {
        dados.push(est)
      }
    })

    dados.forEach(async (h) => {
      const id = h.id || 'id'
      const dados = {
        ...h,
        EQUIPE: h.EQUIPE || [],
        situation: 'estera',
      }
      const docRef = doc(fire, 'notas', id)
      const docSnap = await getDoc(docRef)

      if (!docSnap.data()) {
        addDoc(db, dados)
        console.log('null')
      } else {
        updateDoc(docRef, dados)
        console.log(id)
      }
    })
  }, [estera, preview])

  useEffect(() => {
    setWidth(motionRef.current!.scrollWidth - motionRef.current!.offsetWidth)
  }, [preview, estera, ntCancelada, ntParcial, select])

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
          if (a < b) {
            return -1
          }
          return 0
        })
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

  const upload = useCallback(async () => {}, [file])

  const handleFile = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
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
        upload()
      }
    },
    [upload],
  )

  console.log(select)

  return (
    <Container>
      <Header />

      <Modal isOpen={false}>
        <div>
          <p>hello</p>
        </div>
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
            ref={motionRef}
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
          >
            <div style={{ display: 'flex' }}>
              {preview.map((nt) => (
                <Cards
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
                {estera.map((nt) => (
                  <Cards
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
                {ntParcial.map((nt) => (
                  <Cards
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
                {ntCancelada.map((nt) => (
                  <Cards
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
          {estera.map((h) => (
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
          {ntParcial.map((h) => (
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
          {ntCancelada.map((h) => (
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
