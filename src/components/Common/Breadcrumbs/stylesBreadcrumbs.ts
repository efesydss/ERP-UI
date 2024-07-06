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
  padding: theme.spacing(1),
  height: 44
}))

export const StyledLink = styled(Link)({
  display: 'flex',
  textDecoration: 'none',
  color: 'inherit'
})
