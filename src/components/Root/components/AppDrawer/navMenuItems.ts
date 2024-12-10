import { MdOutlineBeachAccess } from 'react-icons/md'
import { TbUserStar } from 'react-icons/tb'
import { MenuItemProps } from '@/components/Root/typesRoot'
import { FaPeopleRoof, FaRProject } from 'react-icons/fa6'
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
    icon: RiAdminLine,
    sub: [ // Admin menüsünün altına yeni bir alt menü ekliyoruz
      {
        label: 'depot',
        icon: FaRProject // İstediğin bir ikonla değiştirebilirsin
      },
      {
      label:'machines',
      icon: FaRProject
      }
    ]
  },
  {
    label: 'accounting',
    icon: FaRProject,
    sub: [
      {
        label: 'CashAccounts',//TODO erkanAbi : diğer labels accounting mesela otomatik olarak ui kısmında Muhasebe yazıyor ama benimki olmadı onun tanımlaması nerede?
        icon: TbUserStar
      }
    ]
  }
]
