import { Input } from '@/components/Common/Form/Input/Input'
import { DatePicker } from '@/components/Common/Form/DatePicker/DatePicker'
import { BaseSelect, OptionType } from '@/components/Common/Form/BaseSelect'
import { Box } from '@mui/material'

export interface DynamicInputFieldProps {
  name: string
  type?: string
  options?: OptionType[]
  fields?: Array<DynamicInputFieldProps>
}

interface DynamicInputProps {
  prefix: string
  fields: Array<DynamicInputFieldProps>
}

export const DynamicFields = (props: DynamicInputProps) => {
  const { prefix, fields } = props

  return (
    <>
      {fields.map((field, i) => {
        const fieldName = `${prefix}.${field.name}`

        if (field.type === 'date') {
          return (
            <DatePicker
              key={`${prefix}.${i}.${field.name}${i}`}
              name={fieldName}
            />
          )
        }

        //todo: isEnum should be passed as prop
        if (field.type === 'select') {
          return (
            <div key={`${prefix}.${i}.${field.name}${i}`}>
              <BaseSelect
                name={fieldName}
                options={field.options}
                isEnum
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
            isOptional
          />
        )
      })}
    </>
  )
}
