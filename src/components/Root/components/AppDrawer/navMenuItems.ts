import { MdOutlineBeachAccess } from 'react-icons/md'
import { TbUserStar } from 'react-icons/tb'
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
        label: 'employees',
        icon: TbUserStar
      },
      {
        label: 'vacations',
        icon: MdOutlineBeachAccess
      },
      {
        label: 'finances',
        icon: HiOutlineCash
      },
      {
        label: 'timekeeping',
        icon: PiFlag
      }
    ]
  },
  {
    label: 'admin',
    icon: RiAdminLine
  }
]
