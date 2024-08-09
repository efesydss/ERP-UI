import { SyntheticEvent, useState } from 'react'
import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import { IoMdMore } from 'react-icons/io'

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
      >
        <MenuItem>here</MenuItem>
      </Menu>
    </Box>
  )
}
