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
import { Carousel, Container, ContainerCards, Inner } from './styles'
import { Botao } from '../../components/Button'
import { IProsEster } from '../../dtos'
import { api } from '../../api'
export function Home() {
  const motionRef = useRef<any>()
  const [notas, setNotas] = useState<IProsEster[]>([])
  const [estera, setEstera] = useState<IProsEster[]>([])
  const [width, setWidth] = useState(0)
  const [file, setFile] = useState<any>(null)
  const db = collection(fire, 'notas')

  const submit = useCallback(async () => {
    // estera.forEach((h) => {
    //   const dt = {
    //     ...h,
    //     EQUIPE: [],
    //     situation: 'estera',
    //   }
    //   addDoc(db, dt).then((h) => console.log('ok'))
    // })

    const dados: IProsEster[] = []
    notas.forEach((est) => {
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
  }, [estera, notas])

  useEffect(() => {
    console.log(motionRef.current.offsetWidth)
    setWidth(motionRef.current!.scrollWidth - motionRef.current!.offsetWidth)
  }, [notas])

  useEffect(() => {
    onSnapshot(db, (h) => {
      setEstera(
        h.docs.map((p) => {
          return {
            ...p.data(),
            id: p.id,
          } as IProsEster
        }),
      )
    })
  }, [])

  const handleFile = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }, [])

  const upload = useCallback(async () => {
    const data = new FormData()

    data.append('csv', file)

    await api
      .post('/csv', data)
      .then((h) => {
        setNotas(h.data)
      })
      .catch((h) => console.log(h))
  }, [file])

  return (
    <Container>
      <Header />

      <input type="file" onChange={handleFile} />
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
        <label>
          <Botao title="add" pres={upload} />
          <Botao title="upload notas" pres={submit} />
        </label>
      </div>

      <p>ESTEIRA DE PROCESSOS</p>
      <ContainerCards>
        <Carousel whileTap={{ cursor: 'grabbing' }}>
          <Inner
            ref={motionRef}
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
          >
            <div style={{ display: 'flex' }}>
              {notas.map((nt) => (
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
    </Container>
  )
}
