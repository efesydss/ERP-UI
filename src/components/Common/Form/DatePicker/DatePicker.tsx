import { useField } from 'formik'
import RDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { t } from 'i18next'
import { Input } from '@/components/Common/Form/Input/Input'
import { format } from 'date-fns'
import { DatePickerWrapper } from '@/components/Common/Form/DatePicker/stylesDatePicker'

interface DatePickerProps {
  name: string
  isTimeEnabled?: boolean
  label?: string
  isClearable?: boolean
  isOptional?: boolean
}

export const DatePicker = (props: DatePickerProps) => {
  const { name, label, isTimeEnabled = false, isClearable, isOptional, ...rest } = props
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
        customInput={
          <Input
            name={name}
            label={label || t(name, { ns: 'hr' })}
            isOptional={isOptional}
          />
        }
      />
    </DatePickerWrapper>
  )
}
