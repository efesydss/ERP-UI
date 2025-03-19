import Select, { MultiValue, SingleValue } from 'react-select'
import { useField } from 'formik'
import { Stack, useTheme } from '@mui/material'
import { Label } from '@/components/Common/Form/Label/Label'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'
import { NamedEntity } from '@/utils/sharedTypes'
import { useQuery } from '@tanstack/react-query'
import { apiRoutes } from '@/utils/apiRoutes'
import { getSelectStyles } from '@/components/Common/Form/Select/stylesBaseSelect'

export interface OptionType {
  value: number | string | boolean
  label: string | number

  [key: string]: any
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
  selectLabel?: string
  isOptional?: boolean
  placeholder?: string
  fieldName?: string
  isGET?: boolean
}

export const BaseSelect = (props: BaseSelectProps) => {
  const {
    options,
    name,
    isGET,
    nameSpace,
    selectLabel,
    isLoading,
    endpoint,
    isMulti = false,
    isEnum = false,
    isOptional = false,
    onChange,
    placeholder = '',

    ...rest
  } = props
  const [field, { touched, error }, { setValue }] = useField(name)
  const theme = useTheme()

  const { data: fetchedOptions, isLoading: isFetching } = useQuery({
    queryKey: [`${endpoint}List`],
    queryFn: () =>
      apiRequest<ApiResponse<NamedEntity>>({
        endpoint: endpoint!,
        method: isGET ? 'GET' : 'POST', // Varsayılan olarak POST, isGET true ise GET
        ...(isGET
          ? { queryParams: { page: 0, pageSize: 200 } } // GET için queryParams
          : { payload: { filter: '', page: 0, pageSize: 200 } }) // POST için payload
      }),
    select: (res): OptionType[] => {
      const fieldKey = props.fieldName || 'name'
      return res.data.map((r) => ({
        value: r.id,
        label: r[fieldKey as keyof NamedEntity] || r.name || 'Please provide fieldName for label'
      }))
    },
    enabled: !options && !!endpoint
  })

  //todo: onChange only supports singleValue for now
  const handleChange = (newValue: MultiValue<OptionType> | SingleValue<OptionType> | null) => {
    const fieldKey = props.fieldName || 'name'

    if (isEnum) {
      if (newValue === null) {
        setValue('')
      } else if (isMulti && Array.isArray(newValue)) {
        setValue(newValue.map((v) => v.value).join(','))
      } else {
        const selectedOption = newValue as OptionType
        setValue(selectedOption.value)
        if (onChange) {
          onChange(selectedOption.value as string)
        }
      }
    } else {
      if (newValue === null) {
        setValue(isMulti ? [] : { id: 0, name: '' })
      } else if (isMulti && Array.isArray(newValue)) {
        setValue(newValue.map((v) => ({ id: v.value, name: v.label })))
      } else {
        const selectedOption = newValue as OptionType
        setValue({ id: selectedOption.value, [fieldKey]: selectedOption.label })
        if (onChange) {
          onChange(selectedOption.value as string)
        }
      }
    }
  }

  const getValue = (): MultiValue<OptionType> | SingleValue<OptionType> | null => {
    const finalOptions = options || fetchedOptions || []
    const fieldKey = props.fieldName || 'name' // Varsayılan olarak 'name' kullanıyoruz

    if (isEnum) {
      if (isMulti) {
        const values = (field.value as string).split(',') || []
        return finalOptions.filter((option) => values.includes(option.value.toString()))
      } else {
        return finalOptions.find((option) => option.value.toString() === field.value) || null
      }
    } else {
      if (isMulti) {
        const multiValue = field.value as Array<{ id: number; [key: string]: any }> || []
        return finalOptions.filter((option) =>
          multiValue.some((val) => val.id === option.value && val[fieldKey] === option.label)
        )
      }
      const singleValue = field.value as { id: number; [key: string]: any } || {}
      return (
        finalOptions.find(
          (option) =>
            option.value === singleValue?.id &&
            option.label === singleValue?.[fieldKey]
        ) || null
      )
    }
  }

  const hasError = !!(touched && error)

  return (
    <Stack sx={{ minWidth: 250 }}>
      <Label
        name={name}
        hasError={hasError}
        errorMessage={error}
        nameSpace={nameSpace}
        label={selectLabel}
        isOptional={isOptional}
      />
      <Select
        {...rest}
        {...field}
        name={name}
        value={getValue()}
        onChange={handleChange}
        options={options || fetchedOptions}
        isMulti={isMulti}
        menuPlacement="auto"
        menuPortalTarget={document.body}
        styles={{
          menu: (base) => ({
            ...base,
            maxHeight: 300,
            overflowY: 'auto'
          }),
          ...getSelectStyles(theme, hasError)
        }}
        placeholder={placeholder}
        isLoading={isLoading || isFetching}
      />
    </Stack>
  )
}
