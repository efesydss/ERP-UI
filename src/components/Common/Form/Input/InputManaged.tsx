import { InputBaseProps, Stack } from '@mui/material'
import { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import { InputBaseWrapper } from '@/components/Common/Form/stylesForm'
import { Label } from '@/components/Common/Form/Label/Label'

interface InputProps extends InputBaseProps {
  name: string
  nameSpace?: string
  isMultiLine?: boolean
  label?: string
  isOptional?: boolean
  value?: string | number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputBase = (props: InputProps, ref: ForwardedRef<HTMLElement>) => {
  const { name, nameSpace, label, isMultiLine, type, isOptional = false, value: propValue = '', onChange, ...rest } = props
  const [value, setValue] = useState<string | number>(propValue)
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const isNumber = type === 'number'

  useEffect(() => {
    if (isNumber && value !== '') {
      const numericValue = parseFloat(value.toString().replace(/[^\d]/g, ''))
      if (!isNaN(numericValue)) {
        setValue(numericValue)
      }
    }
  }, [value, isNumber, type])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setValue(newValue)
    setTouched(true)
    if (onChange) {
      onChange(event)
    }
    if (isNumber && isNaN(parseFloat(newValue))) {
      setError('Invalid number')
    } else {
      setError(undefined)
    }
  }

  const inputProps = isNumber ? { inputProps: { pattern: '\\d*' } } : {}

  return (
    <Stack>
      <Label
        name={name}
        hasError={touched && !!error}
        errorMessage={error}
        nameSpace={nameSpace}
        isOptional={isOptional}
        label={label}
      />
      <InputBaseWrapper
        ref={ref}
        multiline={isMultiLine}
        rows={isMultiLine ? 4 : 1}
        fullWidth
        error={touched && !!error}
        type={name === 'password' ? 'password' : 'text'}
        value={value}
        onChange={handleChange}
        {...rest}
        {...inputProps}
      />
    </Stack>
  )
}

export const InputManaged = forwardRef(InputBase) as typeof InputBase
