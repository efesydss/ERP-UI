import { Box, IconButton, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { useRouter } from '@tanstack/react-router'
import { IoMdArrowRoundBack } from 'react-icons/io'

interface PageTitleProps {
  title: string
  subTitle?: string
  actions?: ReactNode
  showBackButton?: boolean
}

export const PageTitle = (props: PageTitleProps) => {
  const { title, actions, showBackButton = true, subTitle } = props
  const { history } = useRouter()

  return (
    <Box
      sx={{
        mb: 2,
        pb: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid`,
        borderColor: 'divider'
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {showBackButton && (
            <IconButton onClick={() => history.go(-1)}>
              <IoMdArrowRoundBack />
            </IconButton>
          )}
          <Typography variant={'h6'}>{title}</Typography>
        </Box>
        {subTitle && (
          <Typography
            variant={'body2'}
            sx={{ pl: 6 }}
          >
            {subTitle}
          </Typography>
        )}
      </Box>
      {actions}
    </Box>
  )
}
