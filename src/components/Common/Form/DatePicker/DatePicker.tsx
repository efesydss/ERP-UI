import { useField } from 'formik'
import RDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Stack } from '@mui/material'
import { t } from 'i18next'
import { Input } from '@/components/Common/Form/Input/Input'

interface DatePickerProps {
  name: string
}

export const DatePicker = (props: DatePickerProps) => {
  const { name, ...rest } = props
  const [field, _, { setValue }] = useField(name)

  return (
    <Stack position={'relative'}>
      <RDatePicker
        {...field}
        {...rest}
        dateFormat='dd/MM/yyyy'
        selected={field.value && new Date(field.value)}
        onChange={(value) => setValue(value)}
        locale={'tr'}
        customInput={
          <Input
            name={name}
            label={t(name, { ns: 'hr' })}
          />
        }
      />
    </Stack>
  )
}
