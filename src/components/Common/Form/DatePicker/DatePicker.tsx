import { useField } from 'formik'
import RDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { t } from 'i18next'
import { format } from 'date-fns'
import { DatePickerWrapper } from '@/components/Common/Form/DatePicker/stylesDatePicker'
import { Label } from '@/components/Common/Form/Label/Label'
import { Stack } from '@mui/material'

interface DatePickerProps {
  name: string
  isTimeEnabled?: boolean
  label?: string
  isClearable?: boolean
  isOptional?: boolean
  nameSpace?: string
}

export const DatePicker = (props: DatePickerProps) => {
  const { name, label, isTimeEnabled = false, isClearable, nameSpace, isOptional, ...rest } = props
  const [field, meta, helpers] = useField(name)

  const { value } = meta
  const { setValue } = helpers

  const handleChange = (date: Date | null) => {
    if (date) {
      const formattedDate = isTimeEnabled ? format(date, 'yyyy-MM-dd HH:mm') : format(date, 'yyyy-MM-dd')
      setValue(formattedDate)
    } else {
      setValue('')
    }
  }

  return (
    <DatePickerWrapper>
      <Stack>
        <Label
          name={name}
          label={label}
          isOptional={isOptional}
          hasError={false}
          nameSpace={nameSpace}
        />
      </Stack>
      <RDatePicker
        {...field}
        {...rest}
        dateFormat={isTimeEnabled ? 'yyyy-MM-dd h:mm' : 'yyyy-MM-dd'}
        selected={value ? new Date(field.value) : null}
        onChange={handleChange}
        showTimeInput={isTimeEnabled}
        timeInputLabel={t('timePick', { ns: 'common' })}
        locale={'tr'}
        showYearDropdown
        yearDropdownItemNumber={85}
        scrollableYearDropdown
        isClearable={isClearable}
      />
    </DatePickerWrapper>
  )
}
