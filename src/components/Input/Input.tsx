import { useField } from '@unform/core'
import { InputHTMLAttributes, useEffect, useRef } from 'react'
import { Container } from './styles'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}
export function Input({ name, ...rest }: Props) {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, registerField } = useField(name)

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
