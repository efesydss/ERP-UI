import { Column } from '@tanstack/react-table'
import { ClickAwayListener, IconButton, Stack } from '@mui/material'
import { PropsWithChildren, useState } from 'react'
import { Filter } from '@/components/Common/Table/components/Filter'
import { MdFilterList } from 'react-icons/md'
import { RxCaretSort } from 'react-icons/rx'
import { ColumnHeaderTitle, ColumnHeaderWrapper, FilterWrapper } from '@/components/Common/Table/stylesTable'
import { TbSortAZ, TbSortZA } from 'react-icons/tb'

interface ColumnHeaderProps {
  column: Column<any, unknown>
  isSortedDesc?: boolean
}

export const ColumnHeader = (props: PropsWithChildren<ColumnHeaderProps>) => {
  const { column, children, isSortedDesc } = props
  const [filterVisible, setFilterVisible] = useState(false)

  const isSortable = column.getCanSort()
  const isFilterable = column.getCanFilter()
  const isSelectedForSorting = column.getIsSorted()

  const SortingInfo = () => {
    if (!isSelectedForSorting) {
      return null
    }

    return isSortedDesc ? <TbSortZA /> : <TbSortAZ />
  }

  const handleClickAway = () => {
    setFilterVisible(false)
  }

  return (
    <ColumnHeaderWrapper>
      <ColumnHeaderTitle>{children}</ColumnHeaderTitle>
      {isFilterable && (
        <IconButton
          size={'small'}
          onClick={() => setFilterVisible(true)}
        >
          <MdFilterList />
        </IconButton>
      )}
      {filterVisible && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <FilterWrapper>
            <Filter
              column={column}
              onSetVisible={setFilterVisible}
            />
          </FilterWrapper>
        </ClickAwayListener>
      )}
      {isSortable && (
        <Stack
          gap={1}
          direction={'row'}
          alignItems={'center'}
        >
          <IconButton
            size={'small'}
            onClick={column.getToggleSortingHandler()}
          >
            <RxCaretSort />
          </IconButton>
          <SortingInfo />
        </Stack>
      )}
    </ColumnHeaderWrapper>
  )
}
