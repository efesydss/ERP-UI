import { MdOutlineBeachAccess } from 'react-icons/md'
import { TbUserStar } from 'react-icons/tb'
import { AppEnvironment, MenuItemProps } from '@/components/Root/typesRoot'
import { FaPeopleRoof, FaRProject } from 'react-icons/fa6'
import { RiAdminLine } from 'react-icons/ri'
import { HiOutlineCash } from 'react-icons/hi'
import { PiFlag } from 'react-icons/pi'

const env = import.meta.env.MODE
const environment = env === 'development' ? AppEnvironment.DEVELOPMENT : AppEnvironment.PRODUCTION

const getItems = (items: MenuItemProps[], env: AppEnvironment) : MenuItemProps[] => {
  return items.filter(item => {
    return item.env && item.env.includes(env)
  }).map(item => {
    if (item.sub && item.sub.length > 0) {
      return {
        icon: item.icon,
        label: item.label,
        sub: getItems(item.sub, env)
      }
    }
    return {
      icon: item.icon,
      label: item.label
    }
  })
}

export const allMenuItems: MenuItemProps[] = [
  {
    label: 'hr',
    icon: FaPeopleRoof,
    env: [AppEnvironment.DEVELOPMENT, AppEnvironment.PRODUCTION],
    sub: [
      {
        label: 'employees',
        icon: TbUserStar,
        env: [AppEnvironment.DEVELOPMENT, AppEnvironment.PRODUCTION],
      },
      {
        label: 'vacations',
        icon: MdOutlineBeachAccess,
        env: [AppEnvironment.DEVELOPMENT, AppEnvironment.PRODUCTION],
      },
      {
        label: 'finances',
        icon: HiOutlineCash,
        env: [AppEnvironment.DEVELOPMENT, AppEnvironment.PRODUCTION],
      },
      {
        label: 'timekeeping',
        icon: PiFlag,
        env: [AppEnvironment.DEVELOPMENT, AppEnvironment.PRODUCTION],
      }
    ]
  },
  {
    label: 'admin',
    icon: RiAdminLine,
    env: [AppEnvironment.DEVELOPMENT],
    sub: [
      {
        label: 'depots',
        icon: FaRProject,
        env: [AppEnvironment.DEVELOPMENT],
      },
      {
        label:'roles',
        icon: FaRProject,
        env: [AppEnvironment.DEVELOPMENT],
      },
      {
        label:'machines',
        icon: FaRProject,
        env: [AppEnvironment.DEVELOPMENT],
      },
      {
        label:'companies',
        icon: FaRProject,
        env: [AppEnvironment.DEVELOPMENT],
      },
      {
          label:'paymentMethods',
          icon: FaRProject,
          env: [AppEnvironment.DEVELOPMENT],
      },
      {
            label:'publicHolidays',
            icon: FaRProject,
            env: [AppEnvironment.DEVELOPMENT],
      },
      {
              label:'sections',
              icon: FaRProject,
              env: [AppEnvironment.DEVELOPMENT],
      },

    ]
  },
  {
    label: 'company',
    icon: RiAdminLine,
    env: [AppEnvironment.DEVELOPMENT],
    sub: [
      {
        label: 'branches',
        icon: FaRProject,
        env: [AppEnvironment.DEVELOPMENT],
      },
      {
          label: 'departments',
          icon: FaRProject,
          env: [AppEnvironment.DEVELOPMENT],
      },

    ]
  },

  {
    label: 'accounting',
    icon: FaRProject,
    env: [AppEnvironment.DEVELOPMENT, AppEnvironment.PRODUCTION],
    sub: [
      {
        label: 'CashAccounts',
        icon: TbUserStar,
        env: [AppEnvironment.DEVELOPMENT, AppEnvironment.PRODUCTION],
      },
      {
        label:'cashAccountTransactions',
        icon: TbUserStar,
        env: [AppEnvironment.DEVELOPMENT, AppEnvironment.PRODUCTION],
      },
      {
        label:'expenseCards',
        icon: TbUserStar,
        env: [AppEnvironment.DEVELOPMENT, AppEnvironment.PRODUCTION],
      },
     {
        label:'expenseInvoices',
        icon: TbUserStar,
        env: [AppEnvironment.DEVELOPMENT, AppEnvironment.PRODUCTION],
     },

    ]
  },
  {
    label: 'finance',
    icon: RiAdminLine,
    env: [AppEnvironment.DEVELOPMENT],
    sub: [
      {
        label: 'banks',
        icon: FaRProject,
        env: [AppEnvironment.DEVELOPMENT],
      },
      {
          label: 'bankAccounts',
          icon: FaRProject,
          env: [AppEnvironment.DEVELOPMENT],
      },
      {
          label: 'bankBranches',
          icon: FaRProject,
          env: [AppEnvironment.DEVELOPMENT],
      },

    ]
  },
  {
          label: 'production',
          icon: RiAdminLine,
          env: [AppEnvironment.DEVELOPMENT],
          sub: [
            {
              label: 'projects',
              icon: FaRProject,
              env: [AppEnvironment.DEVELOPMENT],
            },
          ]
        },

    {
            label: 'purchasing',
            icon: RiAdminLine,
            env: [AppEnvironment.DEVELOPMENT],
            sub: [
              {
                label: 'additionalCosts',
                icon: FaRProject,
                env: [AppEnvironment.DEVELOPMENT],
              },
              {
                 label: 'currentAccounts',
                 icon: FaRProject,
                 env: [AppEnvironment.DEVELOPMENT],
              },
              {
                  label: 'currentAccountBankAccounts',
                  icon: FaRProject,
                  env: [AppEnvironment.DEVELOPMENT],
              },
              {
                  label: 'currentAccountTransactions',
                  icon: FaRProject,
                  env: [AppEnvironment.DEVELOPMENT],
              },
              {
                label: 'invoices',
                icon: FaRProject,
                env: [AppEnvironment.DEVELOPMENT],
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
      env: [AppEnvironment.DEVELOPMENT],
      sub: [
        {
          label: 'assignmentCards',
          icon: TbUserStar,
          env: [AppEnvironment.DEVELOPMENT],
        },
        {
              label: 'assignmentTransactions',
              icon: TbUserStar,
              env: [AppEnvironment.DEVELOPMENT],
        },
        {
            label: 'fixtureGroups',
            icon: TbUserStar,
            env: [AppEnvironment.DEVELOPMENT],
        },
        {
                label: 'productGroups',
                icon: TbUserStar,
                env: [AppEnvironment.DEVELOPMENT],
        },
        {
                label: 'serviceGroups',
                icon: TbUserStar,
                env: [AppEnvironment.DEVELOPMENT],
        },
        {
          label:'catalog',
          icon:TbUserStar,
          env: [AppEnvironment.DEVELOPMENT],
        },
        {
          label: 'shelves',
          icon: TbUserStar,
          env: [AppEnvironment.DEVELOPMENT],
        },
        {
          label: 'units',
          icon: TbUserStar,
          env: [AppEnvironment.DEVELOPMENT],
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


export const navMenuItems = getItems(allMenuItems, environment)
