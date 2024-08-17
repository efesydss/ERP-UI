import { Column } from '@tanstack/react-table'
import { FilterInput } from '@/components/Common/Table/components/FilterInput'
import { OptionType } from '@/components/Common/Form/Select/BaseSelect'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'
import { NamedEntity } from '@/utils/sharedTypes'
import { useQuery } from '@tanstack/react-query'
import { FilterSelect } from '@/components/Common/Table/components/FilterSelect'
import { t } from 'i18next'

interface FilterProps {
  column: Column<any, unknown>
  onSetVisible: (value: boolean) => void
}

export const Filter = (props: FilterProps) => {
  const { column, onSetVisible } = props
  const columnFilterValue = column.getFilterValue()
  const {
    filterVariant,
    filterOptions,
    filterOptionsEndpoint,
    filterNameSpace = 'common'
  } = column.columnDef.meta || {}

  //todo: can we get rid off 'branches'
  const { data } = useQuery({
    queryKey: [`${filterOptionsEndpoint}List`],
    queryFn: () =>
      apiRequest<ApiResponse<NamedEntity>>({
        endpoint: filterOptionsEndpoint || 'branches',
        payload: {
          filter: '',
          page: 0,
          pageSize: 100
        }
      }),
    select: (res): OptionType[] => {
      return res.data.map((r) => {
        console.log('r -->', r)

        return {
          value: `${r.id}_${r.name}`,
          label: r.name
        }
      })
    },
    enabled: !filterOptions && !!filterOptionsEndpoint
  })

  const translatedFilterOptions = filterOptions?.map((o) => ({
    value: o.value,
    label: t(`${filterNameSpace}:${o.value}`)
  }))

  const options = data || translatedFilterOptions

  if (filterVariant === 'select' || filterVariant === 'enum') {
    return (
      <FilterSelect
        options={options || []}
        value={columnFilterValue as string}
        onChange={(value) => column.setFilterValue(value)}
        onSetVisible={onSetVisible}
      />
    )
  }

  return (
    <FilterInput
      onChange={(value) => column.setFilterValue(value)}
      value={(columnFilterValue ?? '') as string}
    />
  )
}
