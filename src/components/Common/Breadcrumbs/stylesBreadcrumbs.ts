import { styled } from '@mui/material'
import { Link } from '@tanstack/react-router'

export const CrumbWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center'
})

export const BreadcrumbWrapper = styled('nav')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1, 0),
  height: 44,
  fontSize: '.8rem'
}))

export const StyledLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  textDecoration: 'none',
  color: theme.palette.primary.main,
  transition: theme.transitions.create('color', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.short
  }),
  '&:hover': {
    color: theme.palette.secondary.main
  }
}))
