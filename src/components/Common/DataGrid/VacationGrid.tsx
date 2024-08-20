import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp
} from '@mui/x-data-grid'
import { t } from 'i18next'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'
import { EmployeeVacationProps, VacationType } from '@/components/Hr/Vacations/typeVacations'
import { Box } from '@mui/material'
import { AiOutlineSave } from 'react-icons/ai'
import { MdDeleteOutline, MdModeEdit } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useConfirmDialog } from '@/utils/hooks/useConfirmDialogContext'
import { enumToOptions } from '@/utils/transformers'

interface BaseGridProps {
  employeeId?: number
}

export const VacationGrid = (props: BaseGridProps) => {
  const { employeeId } = props
  const queryClient = useQueryClient()
  const { openDialog } = useConfirmDialog()
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})

  const { data, isLoading } = useQuery({
    queryKey: ['employeeVacation', employeeId],
    queryFn: () =>
      apiRequest<ApiResponse<EmployeeVacationProps>>({
        endpoint: 'employeeVacation',
        payload: {
          filter: '',
          page: 0,
          pageSize: 200
        },
        params: { employeeId: employeeId?.toString() ?? '' }
      }),
    enabled: !!employeeId,
    select: (res) => res.data
  })

  const [rows, setRows] = useState(data ? (data as GridRowsProp<EmployeeVacationProps>) : [])

  const { mutate: deleteVacation } = useMutation({
    mutationFn: async (timeOffId: string) => {
      return await apiRequest({
        endpoint: 'employeeVacationDelete',
        method: 'DELETE',
        params: { employeeId: employeeId?.toString() ?? '0', timeOffId }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employeeVacation'] })
      toast.success('Vacation Deleted')
    }
  })

  const { mutate: updateVacation } = useMutation({
    mutationFn: async (timeOff: EmployeeVacationProps) => {
      return await apiRequest({
        endpoint: 'employeeVacationUpdate',
        method: 'PUT',
        params: { employeeId: employeeId?.toString() ?? '0', timeOffId: timeOff.id.toString() },
        payload: timeOff
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employeeVacation'] })
      toast.success('Vacation Updated')
    }
  })

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = (timeOff: EmployeeVacationProps) => () => {
    setRowModesModel({ ...rowModesModel, [timeOff.id]: { mode: GridRowModes.View } })
    /*console.log('values -->', {
      ...timeOff,
      startDateTime: formatToISOString(timeOff.startDateTime),
      endDateTime: formatToISOString(timeOff.endDateTime)
    })
*/

    //updateVacation(timeOff)
  }

  const handleDeleteClick = (id: GridRowId) => () =>
    openDialog(
      'Confirm Deletion',
      'Are you sure you want to delete this item?',
      () => {
        deleteVacation(id.toString())
      },
      () => {
        console.log('Deletion cancelled')
      }
    )

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    })
  }

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel)
  }

  const processRowUpdate = (newRow: GridRowModel<EmployeeVacationProps>) => {
    console.log('here', {
      ...newRow,
      startDateTime: (newRow.startDateTime as Date).toISOString(),
      endDateTime: (newRow.endDateTime as Date).toISOString()
    })

    updateVacation({
      ...newRow,
      startDateTime: (newRow.startDateTime as Date).toISOString(),
      endDateTime: (newRow.endDateTime as Date).toISOString()
    })

    const updatedRow = { ...newRow, isNew: false }
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
    return updatedRow
  }

  useEffect(() => {
    if (data) {
      setRows(data as GridRowsProp<EmployeeVacationProps>)
    }
  }, [data])

  const columns: GridColDef[] = [
    {
      field: 'startDateTime',
      valueGetter: (value) => new Date(value),
      headerName: t('common:vacationStart'),
      type: 'dateTime',
      width: 230,
      editable: true
    },
    {
      field: 'endDateTime',
      valueGetter: (value) => new Date(value),
      headerName: t('common:vacationEnd'),
      type: 'dateTime',
      width: 200,
      editable: true
    },
    {
      field: 'timeOffType',
      headerName: t('common:timeOffType'),
      //valueGetter: (value: string) => t(`common:${value}`),
      valueOptions: enumToOptions(VacationType),
      type: 'singleSelect',
      width: 230,
      editable: true
    },
    {
      field: 'workingDays',
      headerName: t('common:workingDays'),
      type: 'number',
      editable: true,
      align: 'left',
      headerAlign: 'left'
    },
    {
      field: 'workingHours',
      headerName: t('common:workingHours'),
      type: 'number',
      editable: true,
      align: 'left',
      headerAlign: 'left'
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: (params) => {
        const { id } = params
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<AiOutlineSave />}
              label='Save'
              sx={{
                color: 'primary.main'
              }}
              onClick={handleSaveClick(params.row)}
            />,
            <GridActionsCellItem
              icon={<RxCross1 />}
              label='Cancel'
              className='textPrimary'
              onClick={handleCancelClick(id)}
              color='inherit'
            />
          ]
        }

        return [
          <GridActionsCellItem
            icon={<MdModeEdit />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem
            icon={<MdDeleteOutline />}
            label='Delete'
            onClick={handleDeleteClick(id)}
            color='inherit'
          />
        ]
      }
    }
  ]

  return (
    <Box sx={{ backgroundColor: '#fff' }}>
      <DataGrid
        rows={rows}
        loading={isLoading}
        slotProps={{
          loadingOverlay: {
            variant: 'linear-progress',
            noRowsVariant: 'linear-progress'
          }
        }}
        columns={columns}
        editMode='row'
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onProcessRowUpdateError={(err) => console.log(err)}
        processRowUpdate={processRowUpdate}
      />
    </Box>
  )
}
