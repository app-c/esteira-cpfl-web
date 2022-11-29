import { useCallback, useMemo, useState } from 'react'

const nomes = ['william', 'pedro', 'daisy', 'jasmim']

export function Login() {
  const [arr, setArr] = useState<any[]>(nomes)
  const [value, setValue] = useState('')

  const name = useMemo(() => {
    // const ar = [...arr].sort((a, b) => b < a)
    // const indx = ar.findIndex((h) => h === 'daisy')
    // if (indx > -1) {
    //   ar.splice(indx, 1)
    // }
    // return ar
  }, [arr])

  const submit = useCallback(() => {
    setArr([...arr, value])
  }, [arr, value])

  return (
    <div style={{ padding: 30 }}>
      <input type="text" onChange={(h) => setValue(h.currentTarget.value)} />
      <button onClick={submit}>save</button>
    </div>
  )
}
