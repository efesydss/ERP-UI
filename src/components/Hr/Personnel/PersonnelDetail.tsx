import { Box, Tab, Tabs, Typography } from '@mui/material'
import { ReactNode, SyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface TabPanelProps {
  children?: ReactNode
  index: number
  value: number
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

export const PersonnelDetail = () => {
  const { t: hr } = useTranslation('hr')
  const [value, setValue] = useState(0)

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
        >
          <Tab label={hr('infoGeneral')} />
          <Tab label={hr('infoIdentity')} />
          <Tab label={hr('infoPayroll')} />
        </Tabs>
      </Box>
      <CustomTabPanel
        value={value}
        index={0}
      >
        Item One
      </CustomTabPanel>
      <CustomTabPanel
        value={value}
        index={1}
      >
        Item Two
      </CustomTabPanel>
      <CustomTabPanel
        value={value}
        index={2}
      >
        Item Three
      </CustomTabPanel>
    </Box>
  )
}
