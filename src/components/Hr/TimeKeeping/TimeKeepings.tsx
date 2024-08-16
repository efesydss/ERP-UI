import { TabPanel } from '@/components/Common/Tabs/TabPanel'
import { TimeKeepingDraft } from '@/components/Hr/TimeKeeping/TimeKeepingDraft'
import { TimeKeepingList } from '@/components/Hr/TimeKeeping/TimeKeepingList'

export const TimeKeepings = () => {
  return (
    <TabPanel
      tabs={[
        { label: 'Puantaj Listesi', content: <TimeKeepingList /> },
        { label: 'Taslaklar', content: <TimeKeepingDraft /> }
      ]}
    />
  )
}
