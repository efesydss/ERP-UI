import { useTranslation } from 'react-i18next'
import { useConfirmDialog } from '@/utils/hooks/useConfirmDialogContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { GridRowId } from '@mui/x-data-grid'
import { apiRequest } from '@/utils/apiDefaults'
import { toast } from 'react-toastify'
import { ColumnDef } from '@tanstack/react-table'
import { AssignmentCard } from '@/components/Storage/assignmentCard/types/typesAssignmentCard'
import { useMemo, useCallback } from 'react'
import { Button } from '@mui/material'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { Route } from '@/routes/_authenticated/storage/assignmentCards/new'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { BaseTable } from '@/components/Common/Table/BaseTable'


export const AssignmentCardList = () => {

  const { t } = useTranslation('common')
  const { openDialog } = useConfirmDialog()

  const queryClient = useQueryClient()

  const navigate = useNavigate()


  const { mutate: deleteMachine } = useMutation({
    mutationFn: async (machineId: string) => {
      return await apiRequest({
        endpoint: 'assignmentCardDelete',
        method: 'DELETE',
        params: { machineId: machineId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignmentCards'] })
      toast.success('Assignment Card Deleted')
    }
  })
  const handleDeleteClick = useCallback(
    (id: GridRowId) => () =>
      openDialog(
        'Confirm Deletion',
        'Are you sure you want to delete this item?',
        () => {
          deleteMachine(id.toString())
        },
        () => {
          console.log('Deletion cancelled')
        }
      ),
    [openDialog, deleteMachine])
  const safeAccessor = <T, >(accessorFn: (row: T) => unknown, columnName: string) => {
    return (row: T) => {
      try {
        return accessorFn(row)
      } catch (error) {
        console.error(`Error in column "${columnName}"`, error, row)
        return 'Error'
      }
    }
  }
  const columns = useMemo<ColumnDef<AssignmentCard>[]>(
    () => [
      {
        header: t('assignmentStatusEnum'),
        accessorFn: safeAccessor((row) => row.assignmentStatusEnum || t('-'), 'assignmentStatusEnum')
      },
      {
        header: t('code'),
        accessorFn: safeAccessor((row) => row.code || t('-'), 'code')
      },
      {
        header: t('name'),
        accessorFn: safeAccessor((row) => row.name || t('-'), 'name')
      },
      {
        header: t('insuranceCompany'),
        accessorFn: safeAccessor((row) => row.insuranceCompany || t('-'), 'insuranceCompany')
      },
      {
        header: t('insurance'),
        accessorFn: safeAccessor((row) => (row.insurance ? t('Yes') : t('No')), 'insurance')
      },
      {
        header: t('insurancePolicyNo'),
        accessorFn: safeAccessor((row) => row.insurancePolicyNo || t('-'), 'insurancePolicyNo')
      },
      {
        header: t('insuranceDuration'),
        accessorFn: safeAccessor((row) => row.insuranceDuration || t('-'), 'insuranceDuration')
      },
      {
        header: t('info'),
        accessorFn: safeAccessor((row) => row.info || t('-'), 'info')
      },
      {
        header: t('warrantyPeriodEnum'),
        accessorFn: safeAccessor((row) => row.warrantyPeriodEnum || t('-'), 'warrantyPeriodEnum')
      },
      {
        header: t('warrantyDay'),
        accessorFn: safeAccessor((row) => row.warrantyDay || t('-'), 'warrantyDay')
      },
      {
        header: t('underMaintenance'),
        accessorFn: safeAccessor((row) => (row.underMaintenance ? t('true') : t('false')), 'underMaintenance')
      },
      {
        header: t('maintenanceDuration'),
        accessorFn: safeAccessor((row) => row.maintenanceDuration || t('-'), 'maintenanceDuration')
      },
      {
        header: t('maintenancePeriodEnum'),
        accessorFn: safeAccessor((row) => row.maintenancePeriodEnum || t('-'), 'maintenancePeriodEnum')
      },
      {
        header: t('actions'),
        id: 'actions',
        cell: ({ row }) => (

          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleDeleteClick(row.original.id)}
          >
            {t('delete')}
            console.log('Satır verisi:', row.original);

          </Button>
        )
      }
    ],
    [t, handleDeleteClick]
  )
  console.log('Columns tanımı:', columns)

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
      <h4>Details ile Optimize et</h4>
      <PageTitle
        title={t('assignmentCards')}
        actions={<AssignmentCardListActions />}
      />
      <BaseTable<AssignmentCard> endpoint={endpoint} columns={columns}

      ></BaseTable>


    </>

  )
}