import { OptionType } from '@/components/Common/Form/BaseSelect'

interface FilterSelectProps {
  options: OptionType[]
  value: string
  onChange: (value: string) => void
  onSetVisible: (value: boolean) => void
}

export const FilterSelect = (props: FilterSelectProps) => {
  const { onChange, onSetVisible, options, value } = props
  return (
    <select
      style={{ width: '100%' }}
      onChange={(e) => {
        onChange(e.target.value)
        onSetVisible(false)
      }}
      value={value}
    >
      <option value=''>Tümü</option>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  )
}
