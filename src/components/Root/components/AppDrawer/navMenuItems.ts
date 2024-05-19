import { MdOutlineBeachAccess } from 'react-icons/md'
import { TbReportAnalytics, TbUserStar } from 'react-icons/tb'
import { MenuItemProps } from '@/components/Root/typesRoot'
import { FaPeopleRoof } from 'react-icons/fa6'
import { RiAdminLine } from 'react-icons/ri'
import { HiOutlineCash } from 'react-icons/hi'
import { PiFlag } from 'react-icons/pi'

export const navMenuItems: MenuItemProps[] = [
  {
    label: 'hr',
    icon: FaPeopleRoof,
    sub: [
      {
        label: 'personnel',
        icon: TbUserStar
      },
      {
        label: 'leaves',
        icon: MdOutlineBeachAccess
      },
      {
        label: 'debitCreditAnalysis',
        icon: TbReportAnalytics
      },
      {
        label: 'finances',
        icon: HiOutlineCash
      },
      {
        label: 'tally',
        icon: PiFlag
      }
    ]
  },
  {
    label: 'Admin',
    icon: RiAdminLine
  }
]
