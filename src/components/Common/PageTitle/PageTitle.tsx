import { Box, Typography } from '@mui/material'
import { ReactNode } from 'react'

interface PageTitleProps {
  title: string
  actions?: ReactNode
}

export const PageTitle = (props: PageTitleProps) => {
  const { title, actions } = props

  return (
    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant={'h6'}>{title}</Typography>
      {actions}
    </Box>
  )
}
