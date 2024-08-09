import { styled } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

export const DynamicFieldsWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  backgroundColor: blueGrey['50'],
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1)
}))
