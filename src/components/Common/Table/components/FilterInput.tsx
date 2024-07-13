import { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import { InputBaseProps } from '@mui/material'
import { FilterInputWrapper } from '@/components/Common/Table/stylesTable'

interface FilterInputProps extends Omit<InputBaseProps, 'onChange'> {
  value: string | number
  onChange: (value: string | number) => void
}

export const FilterInputRef = (props: FilterInputProps, ref: ForwardedRef<HTMLElement>) => {
  const { value: initialValue, onChange, ...rest } = props
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, 500)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <FilterInputWrapper
      ref={ref}
      size='small'
      autoFocus
      fullWidth
      onChange={(e) => setValue(e.target.value)}
      value={value}
      {...rest}
    />
  )
}

export const FilterInput = forwardRef(FilterInputRef) as typeof FilterInputRef
