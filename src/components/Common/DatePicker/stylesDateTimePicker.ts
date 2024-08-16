import { styled } from '@mui/material'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'

export const DatePicker = styled(MuiDatePicker)(({ theme }) => ({
  '& input': {
    padding: theme.spacing(0, 1),
    height: 38
  }
}))
