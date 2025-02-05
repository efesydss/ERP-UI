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
    sub: [
      {
        label: 'depots',
        icon: FaRProject
      },
      {
              label:'roles',
              icon: FaRProject
      },
      {
      label:'machines',
      icon: FaRProject
      },
      {
        label:'companies',
        icon: FaRProject
      },
      {
          label:'paymentMethods',
          icon: FaRProject
      },
      {
            label:'publicHolidays',
            icon: FaRProject
      },
      {
              label:'sections',
              icon: FaRProject
      },

    ]
  },
   {
      label: 'company',
      icon: RiAdminLine,
      sub: [
        {
          label: 'branches',
          icon: FaRProject
        },
        {
           label: 'departments',
           icon: FaRProject
        },

      ]
    },

  {
    label: 'accounting',
    icon: FaRProject,
    sub: [
      {
        label: 'CashAccounts',
        icon: TbUserStar
      },
      {
          label:'cashAccountTransactions',
          icon: TbUserStar
      },
      {
          label:'expenseCards',
          icon: TbUserStar
      },
     {
            label:'expenseInvoices',
            icon: TbUserStar
     },

    ]
  },
  {
        label: 'finance',
        icon: RiAdminLine,
        sub: [
          {
            label: 'banks',
            icon: FaRProject
          },
          {
             label: 'bankAccounts',
             icon: FaRProject
          },
          {
              label: 'bankBranches',
              icon: FaRProject
          },

        ]
      },
  {
          label: 'production',
          icon: RiAdminLine,
          sub: [
            {
              label: 'projects',
              icon: FaRProject
            },
          ]
        },

    {
            label: 'purchasing',
            icon: RiAdminLine,
            sub: [
              {
                label: 'additionalCosts',
                icon: FaRProject
              },
              {
                 label: 'currentAccounts',
                 icon: FaRProject
              },
              {
                  label: 'currentAccountBankAccounts',
                  icon: FaRProject
              },
              {
                  label: 'currentAccountTransactions',
                  icon: FaRProject
              },
              {
                label: 'invoices',
                icon: FaRProject
              },
              {
                  label: 'purchaseOrders',
                 icon: FaRProject
              },
            ]
          },

  {
      label: 'storage',
      icon: FaPeopleRoof,
      sub: [
        {
          label: 'assignmentCards',
          icon: TbUserStar
        },
        {
              label: 'assignmentTransactions',
              icon: TbUserStar
        },
        {
            label: 'fixtureCards',
            icon: TbUserStar
        },
        {
            label: 'fixtureGroups',
            icon: TbUserStar
        },
        {
                label: 'materialCards',
                icon: TbUserStar
        },
        {
                label: 'materialGroups',
                icon: TbUserStar
        },
        {
                label: 'productCards',
                icon: TbUserStar
        },
        {
                label: 'productGroups',
                icon: TbUserStar
        },
        {
                label: 'serviceCards',
                icon: TbUserStar
        },
        {
                label: 'serviceGroups',
                icon: TbUserStar
        },
        {
        label: 'shelves',
        icon: TbUserStar
        },
        {
            label: 'units',

            icon: TbUserStar
        },
      ]
    },
{
      label: 'sales',
      icon: RiAdminLine,
      sub: [
        {
          label: 'proposals',
          icon: FaRProject
        },
      ]
    },
]
