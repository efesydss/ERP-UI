import { useTranslation } from 'react-i18next'
import { useConfirmDialog } from '@/utils/hooks/useConfirmDialogContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { GridRowId } from '@mui/x-data-grid'
import { apiRequest } from '@/utils/apiDefaults'
import { toast } from 'react-toastify'
import { ColumnDef } from '@tanstack/react-table'
import { AssignmentCard } from '@/components/Storage/typesAssignmentCard'
import { useMemo } from 'react'
import { Button } from '@mui/material'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { Route } from '@/routes/_authenticated/admin/machines/new'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { BaseTable } from '@/components/Common/Table/BaseTable'
import { MachineSubRow } from '@/components/Admin/machine/MachineSubRow'


export const AssignmentCardList = () => {

  const { t } = useTranslation('common')
  const { openDialog } = useConfirmDialog()

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const handleDeleteClick = (id: GridRowId) => () =>
    openDialog(
      'Confirm Deletion',
      'Are you sure you want to delete this item?',
      () => {
        deleteMachine(id.toString())
      },
      () => {
        console.log('Deletion cancelled')
      }
    )
  const { mutate: deleteMachine } = useMutation({
    mutationFn: async (machineId: string) => {
      return await apiRequest({
        endpoint: 'machineDelete',
        method: 'DELETE',
        params: { machineId: machineId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['machines'] })
      toast.success('Machine Deleted')
    }
  })

  const columns = useMemo<ColumnDef<AssignmentCard>[]>(//todo ef create
    () =>[
      {
        header: t('assignmentStatusEnum'),
        accessorKey: 'assignmentStatusEnum'
      },
      {
        header: t('code'),
        accessorKey: 'code'
      },
      {
        header: t('name'),
        accessorKey: 'name'
      },
      {
        header: t('fixtureCard'),
        accessorFn: (row)=>row.fixtureCard?.fixtureName || t('-Fixture Card Not Found-')
      },
      {
        header: t('fixtureGroup'),
        accessorFn: (row)=>row.fixtureGroup?.code || t('-Fixture Group Not Found-')
      },
      {
        header: t('defaultUnit'),
        accessorKey: 'defaultUnit'
      },
      {
        header: t('fixtureType'),
        accessorKey: 'fixtureType'
      },
      {
        header: t('optimalLevel'),
        accessorKey: 'optimalLevel'
      },
      {
        header: t('minimumLevel'),
        accessorKey: 'minimumLevel'
      },
      {
        header: t('specialCode'),
        accessorKey: 'specialCode'
      },
      {
        header: t('shelfLocation'),
        accessorKey: 'shelfLocation'
      },
      {
        header: t('fixtureCardUnit'),
        accessorFn: (row)=>row.fixtureCardUnit?.unit || t('-Fixture Card Unit Not Found-')
      },
      {
        header: t('insuranceCompany'),
        accessorKey: 'insuranceCompany'
      },
      {
        header: t('insurance'),
        accessorKey: 'insurance'
      },
      {
        header: t('insurancePolicyNo'),
        accessorKey: 'insurancePolicyNo'
      },
      {
        header: t('insuranceDuration'),
        accessorKey: 'insuranceDuration'
      },
      {
        header: t('info'),
        accessorKey: 'info'
      },
      {
        header: t('invoice'),
        accessorFn: (row)=>row.invoice?.code || t('-Invoice Not Found-')
      },
      {
        header: t('generalDiscount'),
        accessorKey: 'generalDiscount'
      },
      {
        header: t('unitDiscount'),
        accessorKey: 'unitDiscount'
      },
      {
        header: t('totalVat'),
        accessorKey: 'totalVat'
      },
      {
        header: t('totalAdditionalCosts'),
        accessorKey: 'totalAdditionalCosts'
      },
      {
        header: t('subTotal'),
        accessorKey: 'subTotal'
      },
      {
        header: t('finalTotal'),
        accessorKey: 'finalTotal'
      },
      {
        header: t('invoiceTypeEnum'),
        accessorKey: 'invoiceTypeEnum'
      },
      {
        header: t('warrantyPeriodEnum'),
        accessorKey: 'warrantyPeriodEnum'
      },
      {
        header: t('warrantyDay'),
        accessorKey: 'warrantyDay'
      },
      {
        header: t('underMaintenance'),
        accessorKey: 'underMaintenance'
      },
      {
        header: t('maintenanceDuration'),
        accessorKey: 'maintenanceDuration'
      },
      {
        header: t('maintenancePeriodEnum'),
        accessorKey: 'maintenancePeriodEnum'
      },
      {
        header: t('actions'),  // Actions başlığı
        id: 'actions',
        cell: ({ row }) => (
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleDeleteClick(row.original.id)}
          >
            {t('delete')}
          </Button>
        )
      }
    ],
    [t]
  )
  const AssignmentCardListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newAssignmentCard')}
        </Button>
      </>
    )
  }
  const endpoint = 'assignmentCards'
  console.log(`Fetching data from endpoint: ${endpoint}`)


  return (
    <>
      <PageTitle
        title={t('assignmentCardList')}
        actions={<AssignmentCardListActions />}
      />
      <BaseTable<AssignmentCard> endpoint={endpoint} columns={columns}//todo Ef git endpoint tanımla..
                           renderSubComponent={(props) => (
                             <MachineSubRow//todo ef git bundan create et.. 4 tane genişletilebilir menü olsun yada başka bok..

                               employeeId={props.row.original.id}
                               row={props.row}
                               handleExpandRow={props.handleExpandRow}
                             />
                           )}
      ></BaseTable>

    </>
  )

}