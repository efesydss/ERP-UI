import { Box, IconButton, Typography } from '@mui/material'
import { IoMdMore } from 'react-icons/io'
import { SyntheticEvent, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { t } from 'i18next'
import { Menu, MenuItem } from '@/components/Common/Menu/stylesMenu'
import { AiOutlineStop } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'

interface PersonnelListEditActionsProps {
  employeeId: number
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
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem onClick={() => navigate({ to: '/hr/employees/$id', params: { id: props.employeeId } })}>
          <CgProfile />
          <Typography>{t('common:employeeDetails')}</Typography>
        </MenuItem>
        <MenuItem>
          <AiOutlineStop />
          <Typography>{t('common:removeEmployee')}</Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}
