import { styled, InputBase as MUIInputBase } from '@mui/material'

export const ErrorMessage = styled('div')(({ theme }) => ({
  color: theme.palette.error.main
}))

export const InputBaseWrapper = styled(MUIInputBase)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: '1px solid',
  borderColor: theme.palette.divider,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.25, 1),
  fontSize: '0.9rem',
  height: 34,

  '&.Mui-error': {
    borderColor: theme.palette.error.main
  },

  '&:hover': {
    borderColor: theme.palette.primary.main
  }
}))

export const LabelWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '0.8rem',
  paddingBottom: theme.spacing(0.2)
}))
