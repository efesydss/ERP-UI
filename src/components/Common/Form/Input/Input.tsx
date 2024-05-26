import { Stack, TextField, TextFieldProps } from '@mui/material'
import { useField } from 'formik'
import { useTranslation } from 'react-i18next'
import { ErrorMessage } from '@/components/Common/Form/stylesForm'

interface InputProps extends Omit<TextFieldProps, 'helperText'> {
  name: string
  nameSpace?: string
  isMultiLine?: boolean
}

export const Input = (props: InputProps) => {
  const { name, nameSpace, isMultiLine, ...rest } = props
  const { t } = useTranslation(nameSpace || 'common')
  const [field, { error, touched }] = useField(name)

  return (
    <Stack position={'relative'}>
      <TextField
        multiline={isMultiLine}
        rows={isMultiLine ? 4 : 1}
        fullWidth
        label={t(name)}
        size={'small'}
        {...field}
        {...rest}
        error={touched && !!error}
      />
      {touched && error && <ErrorMessage>{error}</ErrorMessage>}
    </Stack>
  )
}
