import { Input } from '@/components/Common/Form/Input/Input'
import { DatePicker } from '@/components/Common/Form/DatePicker/DatePicker'
import { BaseSelect, OptionType } from '@/components/Common/Form/Select/BaseSelect'
import { Box } from '@mui/material'
import { apiRoutes } from '@/utils/apiRoutes'
import { t } from 'i18next'
import { labelParser } from '@/utils/transformers'
import { Checkbox } from '@/components/Common/Form/Checkbox/Checkbox'

export interface MachineDynamicInputFieldProps {
  name: string
  type?: string
  options?: OptionType[]
  endpoint?: keyof typeof apiRoutes
  fields?: Array<MachineDynamicInputFieldProps>
  areOptionsEnum?: boolean
  isOptional?: boolean
}

interface MachineDynamicInputProps {
  prefix?: string
  nameSpace?: string
  fields: Array<MachineDynamicInputFieldProps>
}

export const MachineDynamicFields = (props: MachineDynamicInputProps) => {
  const { prefix, fields, nameSpace = 'common' } = props

  return (
    <>
      {fields.map((field, i) => {
        const fieldName = prefix ? `${prefix}.${field.name}` : field.name
        const fieldLabel = t(`${nameSpace}:${labelParser(field.name, '.')}`)

        if (field.type === 'date') {
          return (
            <DatePicker
              key={`${prefix}.${i}.${field.name}${i}`}
              name={fieldName}
              label={fieldLabel}
              isOptional={field.isOptional}
              nameSpace={nameSpace}
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
                nameSpace={nameSpace}
                selectLabel={fieldLabel}
                endpoint={field.endpoint}
                isOptional={field.isOptional}
              />
            </div>
          )
        }

        if (field.type === 'boolean') {
          return (
            <Checkbox
              key={`${prefix}.${i}.${field.name}${i}`}
              name={fieldName}
              label={fieldLabel}
            />
          )
        }

        if (field.type === 'nested' && field.fields) {
          return (
            <Box
              key={fieldName}
              sx={{ display: 'grid', gridColumn: 'span 4', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }}
            >
              <MachineDynamicFields
                prefix={fieldName}
                fields={field.fields}
                nameSpace={nameSpace}
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
            nameSpace={nameSpace}
            label={fieldLabel}
            readOnly={true}
          />
        )
      })}
    </>
  )
}
