import { useNavigate, useRouter } from '@tanstack/react-router'
import { IconButton } from '@mui/material'
import { IoArrowBackSharp } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import { RxCaretRight } from 'react-icons/rx'
import { BreadcrumbWrapper, StyledLink } from '@/components/Common/Breadcrumbs/stylesBreadcrumbs'

interface BreadcrumbProps {
  path: string
  label: string
}

export const Breadcrumbs = () => {
  const router = useRouter()
  const { matches } = router.state
  console.log('matches -->', matches)
  const navigate = useNavigate()
  const { t } = useTranslation('nav')

  const normalizePath = (path: string) => (path === '/' ? path : path.replace(/\/$/, ''))

  const extractLabel = (path: string) => {
    const parts = path.split('/')
    return parts[parts.length - 1] || 'Home'
  }

  const breadcrumbs: BreadcrumbProps[] = matches.reduce((acc, match) => {
    const normalizedPath = normalizePath(match.pathname)
    if (!acc.some((item) => item.path === normalizedPath)) {
      acc.push({
        path: normalizedPath,
        label: t(extractLabel(normalizedPath))
      })
    }
    return acc
  }, [] as BreadcrumbProps[])

  console.log('breadcrumbs -->', breadcrumbs)

  const crumbs = breadcrumbs.map((b, index) => {
    const isLast = index === breadcrumbs.length - 1

    return (
      <BreadcrumbWrapper key={index}>
        {!isLast ? <StyledLink to={b.path}>{b.label}</StyledLink> : <span>{b.label}</span>}
        {!isLast && <RxCaretRight />}
      </BreadcrumbWrapper>
    )
  })

  const handleBack = () => {
    if (breadcrumbs.length > 1) {
      const previousMatch = breadcrumbs[breadcrumbs.length - 2]
      navigate({ to: previousMatch.path })
    }
  }

  return (
    <BreadcrumbWrapper>
      <IconButton
        onClick={handleBack}
        disabled={matches.length <= 1}
      >
        <IoArrowBackSharp />
      </IconButton>
      {crumbs}
    </BreadcrumbWrapper>
  )
}
