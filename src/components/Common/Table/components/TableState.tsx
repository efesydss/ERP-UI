import { TableCell, TableRow } from '@mui/material'
import { PropsWithChildren } from 'react'

interface TableLoadingProps {
  colSpan: number
}

export const TableState = (props: PropsWithChildren<TableLoadingProps>) => {
  const { colSpan, children } = props

  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        align='center'
      >
        {children}
      </TableCell>
    </TableRow>
  )
}
