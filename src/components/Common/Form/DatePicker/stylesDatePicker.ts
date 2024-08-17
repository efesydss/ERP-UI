import { Stack, styled } from '@mui/material'

export const DatePickerWrapper = styled(Stack)(({ theme }) => ({
  position: 'relative',
  '& .react-datepicker-wrapper': {
    display: 'flex'
  },

  '& input': {
    fontSize: '.9rem',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid',
    borderColor: theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0.25, 1),
    height: 34,
    width: '100%',
    color: theme.palette.text.primary,

    '&.Mui-error': {
      borderColor: theme.palette.error.main
    },

    '&:hover': {
      borderColor: theme.palette.primary.main
    },

    '&:focus-visible': {
      outline: 'none',
      borderColor: theme.palette.primary.main
    }
  }
}))
