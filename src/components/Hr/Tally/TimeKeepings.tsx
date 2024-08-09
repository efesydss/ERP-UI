import { TabPanel } from '@/components/Common/Tabs/TabPanel'
import { TimeKeepingDraft } from '@/components/Hr/Tally/TimeKeepingDraft'
import { TimeKeepingList } from '@/components/Hr/Tally/TimeKeepingList'

export const TimeKeepings = () => {
  return (
    <TabPanel
      tabs={[
        { label: 'Taslaklar', content: <TimeKeepingDraft /> },
        { label: 'Puantaj Listesi', content: <TimeKeepingList /> }
      ]}
    />
  )
}
