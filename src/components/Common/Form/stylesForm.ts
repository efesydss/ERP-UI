import { styled } from '@mui/material'

export const ErrorMessage = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: '0.6rem',
  position: 'absolute',
  right: theme.spacing(1),
  bottom: theme.spacing(-2)
}))
