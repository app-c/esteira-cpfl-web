import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { Cards } from '../../components/Cards'
import { Header } from '../../components/Header'
import { onSnapshot, collection } from 'firebase/firestore'
import { fire } from '../../config/firebase'
import { Carousel, Container, ContainerCards, Inner } from './styles'
import { Botao } from '../../components/Button'
import { IProsEster } from '../../dtos'
import { api } from '../../api'

export function Home() {
  const motionRef = useRef()
  const [notas, setNotas] = useState<IProsEster[]>([])
  const [width, setWidth] = useState(0)
  const [file, setFile] = useState<any>(null)

  const submit = useCallback(() => {
    console.log('ok', 'bla')
  }, [])

  useEffect(() => {
    setWidth(motionRef.current!.scrollWidth - motionRef.current!.offsetWidth)
  }, [])

  const db = collection(fire, 'notas')

  // useEffect(() => {
  //   onSnapshot(db, (h) => {
  //     setNotas(h.docs.map((p) => p.data() as IProsEster))
  //   })
  // }, [])

  const handleFile = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }, [])

  const upload = useCallback(async () => {
    const data = new FormData()

    data.append('csv', file)

    await api
      .post('/', data)
      .then((h) => {
        setNotas(h.data)
      })
      .catch((h) => console.log(h))
    console.log(data)
  }, [file])

  console.log(notas)

  return (
    <Container>
      <Header />

      <div
        style={{
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <label>
          <input type="file" onChange={handleFile} />

          <Botao title="add" pres={upload} />
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
                  pres={submit}
                />
              ))}
            </div>
          </Inner>
        </Carousel>
      </ContainerCards>
    </Container>
  )
}
