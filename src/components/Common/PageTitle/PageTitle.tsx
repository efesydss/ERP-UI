import { Box, IconButton, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { useRouter } from '@tanstack/react-router'
import { IoMdArrowRoundBack } from 'react-icons/io'

interface PageTitleProps {
  title: string
  actions?: ReactNode
  showBackButton?: boolean
}

export const PageTitle = (props: PageTitleProps) => {
  const { title, actions, showBackButton = true } = props
  const { history } = useRouter()

  return (
    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {showBackButton && (
          <IconButton onClick={() => history.go(-1)}>
            <IoMdArrowRoundBack />
          </IconButton>
        )}

        <Typography variant={'h6'}>{title}</Typography>
      </Box>
      {actions}
    </Box>
  )
}
