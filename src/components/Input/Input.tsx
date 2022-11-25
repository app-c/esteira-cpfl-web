import { InputHTMLAttributes, useEffect, useRef } from 'react'
import { Container, Title } from './styles'
import { useField } from '@unform/core'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}
export function Input({ name, ...rest }: Props) {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, error, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  return (
    <Container>
      <input
        defaultValue={defaultValue}
        ref={inputRef}
        type={'text'}
        {...rest}
      />
    </Container>
  )
}
