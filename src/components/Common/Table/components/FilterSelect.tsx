import { OptionType } from '@/components/Common/Form/Select/BaseSelect'

interface FilterSelectProps {
  options: OptionType[]
  value: string | number | boolean
  onChange: (value: string | number | boolean) => void
  onSetVisible: (value: boolean) => void
}

export const FilterSelect = (props: FilterSelectProps) => {
  const { onChange, onSetVisible, options, value } = props
  return (
    <select
      style={{ width: '100%' }}
      onChange={(e) => {
        const selectedValue = e.target.value
        onChange(selectedValue === 'true' ? true : selectedValue === 'false' ? false : selectedValue)
        onSetVisible(false)
      }}
      value={value.toString()}
    >
      <option value=''>Tümü</option>
      {options.map((option) => (
        <option
          key={option.value.toString()}
          value={option.value.toString()}
        >
          {option.label}
        </option>
      ))}
    </select>
  )
}
