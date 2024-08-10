import { SyntheticEvent, useState } from 'react'
import { Box, IconButton } from '@mui/material'
import { IoMdMore } from 'react-icons/io'
import { Menu, MenuItem } from '@/components/Common/Menu/stylesMenu'

interface TimeKeepingListActionsProps {
  timeKeepingId: number
}

export const TimeKeepingListActions = (props: TimeKeepingListActionsProps) => {
  const { timeKeepingId } = props

  console.log('timeKeepingId -->', timeKeepingId)

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
        <MenuItem>details</MenuItem>
      </Menu>
    </Box>
  )
}
