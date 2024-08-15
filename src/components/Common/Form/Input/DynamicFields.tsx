import { Input } from '@/components/Common/Form/Input/Input'
import { DatePicker } from '@/components/Common/Form/DatePicker/DatePicker'
import { BaseSelect, OptionType } from '@/components/Common/Form/BaseSelect'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { apiRoutes } from '@/utils/apiRoutes'

export interface DynamicInputFieldProps {
  name: string
  type?: string
  options?: OptionType[]
  endpoint?: keyof typeof apiRoutes
  fields?: Array<DynamicInputFieldProps>
  areOptionsEnum?: boolean
  isOptional?: boolean
}

interface DynamicInputProps {
  prefix?: string
  fields: Array<DynamicInputFieldProps>
}

export const DynamicFields = (props: DynamicInputProps) => {
  const { prefix, fields } = props
  const { t } = useTranslation('hr')

  const getLabel = (str: string): string => {
    const parts = str.split('.')
    return parts[parts.length - 1]
  }

  return (
    <>
      {fields.map((field, i) => {
        const fieldName = prefix ? `${prefix}.${field.name}` : field.name
        const fieldLabel = t(getLabel(field.name))

        if (field.type === 'date') {
          return (
            <DatePicker
              key={`${prefix}.${i}.${field.name}${i}`}
              name={fieldName}
              label={fieldLabel}
              isOptional={field.isOptional}
            />
          )
        }

        if (field.type === 'select') {
          const isEnum = field.endpoint ? false : field.areOptionsEnum !== false

          return (
            <div key={`${prefix}.${i}.${field.name}${i}`}>
              <BaseSelect
                name={fieldName}
                options={field.options}
                isEnum={isEnum}
                nameSpace={'hr'}
                selectLabel={fieldLabel}
                endpoint={field.endpoint}
                isOptional={field.isOptional}
              />
            </div>
          )
        }

        if (field.type === 'nested' && field.fields) {
          return (
            <Box
              key={fieldName}
              sx={{ display: 'grid', gridColumn: 'span 4', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }}
            >
              <DynamicFields
                prefix={fieldName}
                fields={field.fields}
              />
            </Box>
          )
        }

        return (
          <Input
            key={`${prefix}.${i}.${field.name}${i}`}
            name={fieldName}
            type={field.type || 'text'}
            isOptional={field.isOptional}
            nameSpace={'hr'}
            label={fieldLabel}
          />
        )
      })}
    </>
  )
}
