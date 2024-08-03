import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import { IoMdMore } from 'react-icons/io'
import { SyntheticEvent, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { t } from 'i18next'

interface PersonnelListEditActionsProps {
  personnelId: number
}

export const EmployeeListEditActions = (props: PersonnelListEditActionsProps) => {
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
      >
        <MenuItem onClick={() => navigate({ to: '/hr/employees/$id', params: { id: props.personnelId } })}>{t('common:details')}</MenuItem>
      </Menu>
    </Box>
  )
}
