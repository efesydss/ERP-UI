import { Column } from '@tanstack/react-table'
import { FilterInput } from '@/components/Common/Table/components/FilterInput'

interface FilterProps {
  column: Column<any, unknown>
}

export const Filter = (props: FilterProps) => {
  const { column } = props
  const columnFilterValue = column.getFilterValue()
  //const { filterVariant } = column.columnDef.meta ?? {}

  return (
    <FilterInput
      onChange={(value) => column.setFilterValue(value)}
      value={(columnFilterValue ?? '') as string}
    />
  )
}
