import { InputBase as MUIInputBase, Paper, styled, TableHead, Typography } from '@mui/material'

const columnHeaderHeight = 30

export const ColumnHeaderWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  height: columnHeaderHeight,
  alignItems: 'center',
  gap: theme.spacing(0.5)
}))

export const ColumnHeaderTitle = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(2),
  textTransform: 'uppercase',
  fontSize: '0.8rem'
})) as typeof Typography

export const FilterWrapper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  bottom: -columnHeaderHeight,
  left: 0,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius
}))

export const FilterInputWrapper = styled(MUIInputBase)(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.palette.divider,
  borderRadius: theme.shape.borderRadius,

  '& input': {
    padding: theme.spacing(0.25, 0.5),
    fontSize: '0.8rem'
  }
}))

export const TableHeader = styled(TableHead)(({ theme }) => ({
  '& th': {
    backgroundColor: theme.palette.muted.main
  }
}))
