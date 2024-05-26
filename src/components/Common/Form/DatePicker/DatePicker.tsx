import { useField } from 'formik'
import RDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Stack, TextField } from '@mui/material'
import { ErrorMessage } from '@/components/Common/Form/stylesForm'
import { t } from 'i18next'

interface DatePickerProps {
  name: string
  label: string
}

export const DatePicker = (props: DatePickerProps) => {
  const { name, label, ...rest } = props
  const [field, { touched, error }, { setValue }] = useField(name)

  console.log('error -->', error)

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
          <TextField
            label={t(name)}
            fullWidth
            size={'small'}
            error={touched && !!error}
          />
        }
      />
      {touched && error && <ErrorMessage>{error}</ErrorMessage>}
    </Stack>
  )
}
