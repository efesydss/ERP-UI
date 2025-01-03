import { Box, Tab, Tabs } from '@mui/material'
import { ReactNode, SyntheticEvent, useEffect, useState } from 'react'

interface TabPanelWrapperProps {
  children?: ReactNode
  index: number
  value: number
}

interface TabPanelProps {
  tabs: Array<{ label: string; content: ReactNode }>
  activeTab?: number
  onTabChange?: (value: number) => void
}

const TabPanelWrapper = (props: TabPanelWrapperProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabPanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ my: 2 }}>{children}</Box>}
    </div>
  )
}

export const TabPanel = (props: TabPanelProps) => {
  const { tabs, activeTab: activeTabProp, onTabChange } = props
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
    if (onTabChange) {
      onTabChange(newValue)
    }
  }

  useEffect(() => {
    if (activeTabProp !== undefined) {
      setActiveTab(activeTabProp)
    }
  }, [activeTabProp])

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
        >
          {tabs.map((tab, idx) => (
            <Tab
              key={idx}
              label={tab.label}
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, idx) => (
        <TabPanelWrapper
          key={idx}
          value={activeTab}
          index={idx}
        >
          {tab.content}
        </TabPanelWrapper>
      ))}
    </Box>
  )
}
