import { SyntheticEvent, useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { IoMdMore } from 'react-icons/io'
import { Menu, MenuItem } from '@/components/Common/Menu/stylesMenu'
import { CiViewList } from 'react-icons/ci'
import { t } from 'i18next'
import { useNavigate } from '@tanstack/react-router'

interface TimeKeepingListActionsProps {
  timeKeepingId: number
}

export const TimeKeepingListActions = (props: TimeKeepingListActionsProps) => {
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(anchorEl)

  const handleClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        size={'small'}
      >
        <IoMdMore />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem onClick={() => navigate({ to: '/hr/timekeeping/$id', params: { id: props.timeKeepingId } })}>
          <CiViewList />
          <Typography>{t('hr:timeKeepingDetails')}</Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}
