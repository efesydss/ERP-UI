import { useNavigate, useRouter } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { LuDot } from 'react-icons/lu'
import { BreadcrumbWrapper, CrumbWrapper, StyledLink } from '@/components/Common/Breadcrumbs/stylesBreadcrumbs'
import { IoHomeOutline } from 'react-icons/io5'
import { IconButton, Skeleton, Stack } from '@mui/material'
import { useAppContext } from '@/utils/hooks/useAppContext'

interface BreadcrumbProps {
  path: string
  label: string
}

export const Breadcrumbs = () => {
  const router = useRouter()
  const { matches, isLoading } = router.state
  const navigate = useNavigate()
  const { t } = useTranslation('nav')
  const { crumb: dynamicPath } = useAppContext()

  const normalizePath = (path: string) => (path === '/' ? path : path.replace(/\/$/, ''))

  const extractLabel = (path: string) => {
    const parts = path.split('/')
    return parts[parts.length - 1] || ''
  }

  const breadcrumbs: BreadcrumbProps[] = matches.reduce((acc, match) => {
    const normalizedPath = normalizePath(match.pathname)
    const isDynamic = match.routeId.includes('$')

    if (!acc.some((item) => item.path === normalizedPath)) {
      acc.push({
        path: normalizedPath,
        label: isDynamic ? dynamicPath : t(extractLabel(normalizedPath))
      })
    }
    return acc
  }, [] as BreadcrumbProps[])

  const HomeLink = () => {
    return (
      <IconButton
        onClick={() => navigate({ to: '/dashboard' })}
        sx={{ width: 32, height: 32 }}
      >
        <IoHomeOutline />
      </IconButton>
    )
  }

  const CrumbsLoader = () => {
    return (
      <Stack
        gap={1}
        direction={'row'}
      >
        <Skeleton
          animation='wave'
          width={20}
        />
        <Skeleton
          animation='wave'
          width={140}
        />
      </Stack>
    )
  }

  const crumbs = breadcrumbs.map((b, index) => {
    const isLast = index === breadcrumbs.length - 1

    return (
      <CrumbWrapper key={index}>
        {!isLast ? <StyledLink to={b.path}>{b.label}</StyledLink> : <span>{b.label}</span>}
        {!isLast && <LuDot />}
      </CrumbWrapper>
    )
  })

  return (
    <BreadcrumbWrapper>
      {isLoading ? (
        <CrumbsLoader />
      ) : (
        <>
          <HomeLink />
          {crumbs}
        </>
      )}
    </BreadcrumbWrapper>
  )
}
