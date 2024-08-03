import Select, { MultiValue, SingleValue } from 'react-select'
import { useField } from 'formik'
import { Stack, useTheme } from '@mui/material'
import { Label } from '@/components/Common/Form/Label/Label'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'
import { NamedEntity } from '@/utils/sharedTypes'
import { useQuery } from '@tanstack/react-query'
import { apiRoutes } from '@/utils/apiRoutes'

export interface OptionType {
  value: number
  label: string
}

interface BaseSelectProps {
  name: string
  options?: OptionType[]
  isMulti?: boolean
  nameSpace?: string
  isLoading?: boolean
  endpoint?: keyof typeof apiRoutes
}

export const BaseSelect = (props: BaseSelectProps) => {
  const { options, name, nameSpace, isLoading, endpoint, isMulti = false, ...rest } = props
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
          pageSize: 100
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

  const onChange = (newValue: MultiValue<OptionType> | SingleValue<OptionType> | null) => {
    if (newValue === null) {
      setValue(isMulti ? [] : { id: 0, name: '' })
    } else if (isMulti && Array.isArray(newValue)) {
      setValue(newValue.map((v) => ({ id: v.value, name: v.label })))
    } else {
      const selectedOption = newValue as OptionType
      setValue({ id: selectedOption.value, name: selectedOption.label })
    }
  }

  const getValue = (): MultiValue<OptionType> | SingleValue<OptionType> | null => {
    const finalOptions = options || fetchedOptions || []
    if (isMulti) {
      return finalOptions.filter((option) => (field.value as Array<{ id: number; name: string }>).some((val) => val.id === option.value))
    }
    const singleValue = finalOptions.find((option) => option.value === (field.value as { id: number; name: string })?.id)
    return singleValue ? singleValue : null
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
    <Stack>
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
        onChange={onChange}
        options={options || fetchedOptions}
        isMulti={isMulti}
        styles={customStyles}
        placeholder={''}
        isLoading={isLoading || isFetching}
      />
    </Stack>
  )
}
