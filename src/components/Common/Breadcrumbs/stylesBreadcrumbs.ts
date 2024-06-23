import { styled } from '@mui/material'
import { Link } from '@tanstack/react-router'

export const BreadcrumbWrapper = styled('nav')({
  display: 'flex',
  alignItems: 'center'
})

export const StyledLink = styled(Link)({
  display: 'flex',
  textDecoration: 'none',
  color: 'inherit'
})
