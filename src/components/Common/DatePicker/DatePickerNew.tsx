import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { tr } from 'date-fns/locale/tr'
import { DatePicker } from '@/components/Common/DatePicker/stylesDateTimePicker'
import { useField } from 'formik'
import { alpha, OutlinedInputProps, Stack, styled, TextField, TextFieldProps } from '@mui/material'
import { Label } from '@/components/Common/Form/Label/Label'
import { parse, format } from 'date-fns'

interface DateTimePickerProps {
  name: string
  label?: string
  isOptional?: boolean
}

const DatePickerInput = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: 'transparent'
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main
    }
  }
}))

export const DatePickerNew = (props: DateTimePickerProps) => {
  const { name, label, isOptional = false } = props
  const [, meta, helpers] = useField(name)

  const { value, error, touched } = meta
  const { setValue } = helpers

  const hasError = touched && !!error

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={tr}
    >
      <Stack>
        <Label
          name={name}
          label={label}
          hasError={hasError}
          isOptional={isOptional}
        />
        {value && (
          <DatePicker
            value={parse(value, 'yyyy-MM-dd', new Date())}
            onChange={(value) => value && setValue(format(value, 'yyyy-MM-dd'))}
            slots={{
              textField: (params) => <DatePickerInput {...params} />
            }}
          />
        )}
      </Stack>
    </LocalizationProvider>
  )
}
