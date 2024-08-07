import Select, { MultiValue, SingleValue } from 'react-select'
import { useField } from 'formik'
import { Stack, useTheme } from '@mui/material'
import { Label } from '@/components/Common/Form/Label/Label'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'
import { NamedEntity } from '@/utils/sharedTypes'
import { useQuery } from '@tanstack/react-query'
import { apiRoutes } from '@/utils/apiRoutes'

export interface OptionType {
  value: number | string
  label: string
}

interface BaseSelectProps {
  name: string
  options?: OptionType[]
  isMulti?: boolean
  nameSpace?: string
  isLoading?: boolean
  endpoint?: keyof typeof apiRoutes
  isEnum?: boolean
  onChange?: (option: string) => void
}

export const BaseSelect = (props: BaseSelectProps) => {
  const { options, name, nameSpace, isLoading, endpoint, isMulti = false, isEnum = false, onChange, ...rest } = props
  const [field, { touched, error }, { setValue }] = useField(name)
  const theme = useTheme()

  //todo: can we get rid off 'branches'
  const { data: fetchedOptions, isLoading: isFetching } = useQuery({
    queryKey: [`${endpoint}List`],
    queryFn: () =>
      apiRequest<ApiResponse<NamedEntity>>({
        endpoint: endpoint || 'branches',
        payload: {
          filter: '',
          page: 0,
          pageSize: 200
        }
      }),
    select: (res): OptionType[] => {
      return res.data.map((r) => ({
        value: r.id,
        label: r.name
      }))
    },
    enabled: !options && !!endpoint
  })

  //todo: refactor isEnum condition
  //todo: onChange only supports singleValue for now

  const handleChange = (newValue: MultiValue<OptionType> | SingleValue<OptionType> | null) => {
    if (isEnum) {
      if (newValue === null) {
        setValue('')
      } else if (isMulti && Array.isArray(newValue)) {
        setValue(newValue.map((v) => v.value).join(','))
      } else {
        const selectedOption = newValue as OptionType
        setValue(selectedOption.value)
      }
    } else {
      if (newValue === null) {
        setValue(isMulti ? [] : { id: 0, name: '' })
      } else if (isMulti && Array.isArray(newValue)) {
        setValue(newValue.map((v) => ({ id: v.value, name: v.label })))
      } else {
        const selectedOption = newValue as OptionType
        setValue({ id: selectedOption.value, name: selectedOption.label })
        if (onChange) {
          onChange(selectedOption.value as string)
        }
      }
    }
  }

  const getValue = (): MultiValue<OptionType> | SingleValue<OptionType> | null => {
    const finalOptions = options || fetchedOptions || []
    if (isEnum) {
      if (isMulti) {
        const values = (field.value as string).split(',')
        return finalOptions.filter((option) => values.includes(option.value.toString()))
      } else {
        return finalOptions.find((option) => option.value.toString() === field.value) || null
      }
    } else {
      if (isMulti) {
        return finalOptions.filter((option) => (field.value as Array<{ id: number; name: string }>).some((val) => val.id === option.value))
      }
      const singleValue = finalOptions.find((option) => option.value === (field.value as { id: number; name: string })?.id)
      return singleValue ? singleValue : null
    }
  }
  const hasError = !!(touched && error)

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      cursor: 'pointer',
      borderColor: hasError ? theme.palette.error.main : theme.palette.divider,
      '&:hover': {
        borderColor: hasError ? theme.palette.error.main : theme.palette.primary.main
      }
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: hasError ? theme.palette.error.main : provided.color
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: hasError ? theme.palette.error.main : provided.color
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 1001
    })
  }

  return (
    <Stack sx={{ width: '100%' }}>
      <Label
        name={name}
        hasError={hasError}
        errorMessage={error}
        nameSpace={nameSpace}
      />
      <Select
        {...rest}
        {...field}
        name={name}
        value={getValue()}
        onChange={handleChange}
        options={options || fetchedOptions}
        isMulti={isMulti}
        styles={customStyles}
        placeholder={''}
        isLoading={isLoading || isFetching}
      />
    </Stack>
  )
}
