import { Column } from '@tanstack/react-table'
import { FilterInput } from '@/components/Common/Table/components/FilterInput'
import { OptionType } from '@/components/Common/Form/BaseSelect'

interface FilterProps {
  column: Column<any, unknown>
}

export const Filter = (props: FilterProps) => {
  const { column } = props
  const columnFilterValue = column.getFilterValue()
  const { filterVariant, filterOptions } = column.columnDef.meta || {}

  if (filterVariant === 'select') {
    return (
      <select
        onChange={(e) => column.setFilterValue(e.target.value)}
        value={columnFilterValue?.toString()}
      >
        <option value=''>All</option>
        {filterOptions?.map((option: OptionType) => (
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

  return (
    <FilterInput
      onChange={(value) => column.setFilterValue(value)}
      value={(columnFilterValue ?? '') as string}
    />
  )
}
