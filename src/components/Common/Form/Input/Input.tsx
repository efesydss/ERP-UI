import { InputBaseProps, Stack } from '@mui/material'
import { useField } from 'formik'
import { InputBaseWrapper } from '@/components/Common/Form/stylesForm'
import { Label } from '@/components/Common/Form/Label/Label'
import { ChangeEvent, ForwardedRef, forwardRef } from 'react'

interface InputProps extends InputBaseProps {
  name: string
  nameSpace?: string
  isMultiLine?: boolean
  label?: string
  isOptional?: boolean
}

const InputBase = (props: InputProps, ref: ForwardedRef<HTMLElement>) => {
  const { name, nameSpace, label, isMultiLine, type, isOptional = false, onChange, ...rest } = props
  const [field, { error, touched }, { setValue }] = useField(name)
  const isNumber = type === 'number'

  const hasError = touched && !!error

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNumber) {
      const value = e.target.value
      const numericValue = value.replace(/[^0-9.,]/g, '') // Remove any non-numeric characters except . and ,
      setValue(numericValue)
    } else {
      setValue(e.target.value)
    }

    if (onChange) {
      onChange(e)
    }
  }

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
        type={isNumber ? 'text' : name === 'password' ? 'password' : 'text'}
        {...field}
        {...rest}
        onChange={handleChange}
      />
    </Stack>
  )
}

export const Input = forwardRef(InputBase) as typeof InputBase
