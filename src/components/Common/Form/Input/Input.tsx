import { InputBaseProps, Stack } from '@mui/material'
import { useField } from 'formik'
import { InputBaseWrapper } from '@/components/Common/Form/stylesForm'
import { Label } from '@/components/Common/Form/Label/Label'
import { ForwardedRef, forwardRef, useEffect } from 'react'

interface InputProps extends InputBaseProps {
  name: string
  nameSpace?: string
  isMultiLine?: boolean
  label?: string
  isOptional?: boolean
}

const InputBase = (props: InputProps, ref: ForwardedRef<HTMLElement>) => {
  const { name, nameSpace, label, isMultiLine, type, isOptional = false, ...rest } = props
  const [field, { error, touched }, { setValue }] = useField(name)
  const isNumber = type === 'number'

  const hasError = touched && !!error

  useEffect(() => {
    if (!isNumber) {
      return
    }

    if (field.value !== undefined && field.value !== '') {
      const numericValue = parseFloat(field.value.toString().replace(/[^\d.]/g, ''))
      if (!isNaN(numericValue)) {
        setValue(numericValue)
      }
    }
  }, [field.value, isNumber, setValue, type])

  const inputProps = isNumber ? { inputProps: { pattern: '[0-9]*[.,]?[0-9]*' } } : {}

  return (
    <Stack>
      <Label
        name={name}
        hasError={hasError}
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
        error={hasError}
        type={isNumber ? 'number' : name === 'password' ? 'password' : 'text'}
        {...field}
        {...rest}
        {...inputProps}
      />
    </Stack>
  )
}

export const Input = forwardRef(InputBase) as typeof InputBase
