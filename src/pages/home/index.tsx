import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { Cards } from '../../components/Cards'
import { Header } from '../../components/Header'
import { theme } from '../../theme/theme'
import { onSnapshot, collection } from 'firebase/firestore'
import { fire } from '../../config/firebase'
import { motion } from 'framer-motion'
import { Carousel, Container, ContainerCards, Inner } from './styles'
import { Botao } from '../../components/Button'
import axios from 'axios'
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
  useEffect(() => {
    onSnapshot(db, (h) => {
      setNotas(h.docs.map((p) => p.data() as IProsEster))
    })
  }, [db])

  const handleFile = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const data = new FormData()

      data.append('csv', e.target.files[0])

      console.log(e.target.files[0])

      //   await api
      //     .post('http://192.168.5.124:3333', data)
      //     .then((h) => {
      //       console.log(h.data)
      //     })
      //     .catch((h) => console.log(h))
    }
  }, [])

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
                />
              ))}
            </div>
          </Inner>
        </Carousel>
      </ContainerCards>
    </Container>
  )
}
