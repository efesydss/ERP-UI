import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material'
import { useField } from 'formik'

interface CheckboxProps {
  name: string
  label: string
}

export const Checkbox = ({ name, label }: CheckboxProps) => {
  const [field, , helpers] = useField(name)
  const { setValue } = helpers

  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          {...field}
          checked={!!field.value}
          onChange={(e) => setValue(e.target.checked)}
        />
      }
      label={label}
    />
  )
}
