import { Chip, Stack } from '@mui/material'
import { ColumnFiltersState } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'

interface AppliedFiltersProps {
  columnFilters: ColumnFiltersState
  onDelete: (id: string) => void
  nameSpace: string
}

export const AppliedFilters = (props: AppliedFiltersProps) => {
  const { columnFilters, onDelete, nameSpace } = props
  const { t } = useTranslation(nameSpace)

  return (
    <Stack
      direction={'row'}
      gap={2}
    >
      {columnFilters.map((f) => {
        return (
          <Chip
            key={`${f.id}_${f.value}`}
            size={'small'}
            label={`${t(f.id)}: ${f.value}`}
            variant='filled'
            onDelete={() => onDelete(f.id)}
          />
        )
      })}
    </Stack>
  )
}
