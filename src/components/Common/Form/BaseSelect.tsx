import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select'
import { useField } from 'formik'
import { ErrorMessage } from '@/components/Common/Form/stylesForm'
import { Stack, useTheme } from '@mui/material'

interface OptionType {
  value: string
  label: string
}

interface BaseSelectProps {
  name: string
  options: OptionType[]
  isMulti?: boolean
}

export const BaseSelect = (props: BaseSelectProps) => {
  const { options, name, isMulti = false, ...rest } = props
  const [field, { touched, error }, { setValue }] = useField(name)
  const theme = useTheme()

  const onChange = (newValue: MultiValue<OptionType> | SingleValue<OptionType> | null, _actionMeta: ActionMeta<OptionType>) => {
    let valueToSet: string | string[] = ''

    if (newValue === null) {
      valueToSet = ''
    } else if (isMulti && Array.isArray(newValue)) {
      valueToSet = newValue.map((item: OptionType) => item.value)
    } else {
      valueToSet = (newValue as SingleValue<OptionType>)?.value || ''
    }

    setValue(valueToSet)
  }

  const getValue = () => {
    if (options) {
      return isMulti ? options.filter((option) => field.value.includes(option.value)) : options.find((option) => option.value === field.value) || null
    } else {
      return isMulti ? [] : null
    }
  }

  const hasError = !!(touched && error)

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderColor: hasError ? theme.palette.error.main : provided.borderColor,
      '&:hover': {
        borderColor: hasError ? theme.palette.error.main : provided['&:hover'].borderColor
      }
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: hasError ? theme.palette.error.main : provided.color
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: hasError ? theme.palette.error.main : provided.color
    })
  }

  return (
    <Stack position={'relative'}>
      <Select
        {...rest}
        {...field}
        name={field.name}
        value={getValue()}
        onChange={onChange}
        options={options}
        isMulti={isMulti}
        styles={customStyles}
      />
      {touched && error && <ErrorMessage>{error}</ErrorMessage>}
    </Stack>
  )
}
