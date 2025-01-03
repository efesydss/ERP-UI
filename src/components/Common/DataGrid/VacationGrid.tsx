import {
  DataGrid,
  getGridDateOperators,
  GRID_DATETIME_COL_DEF,
  GridActionsCellItem,
  GridColDef,
  GridColTypeDef,
  GridEventListener,
  GridFilterInputValueProps,
  GridRenderEditCellParams,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridSlots,
  GridToolbarContainer,
  useGridApiContext
} from '@mui/x-data-grid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'
import { VacationBaseProps, VacationType } from '@/components/Hr/Vacations/typeVacations'
import { Box, Button, InputBase, InputBaseProps, styled, TextFieldProps } from '@mui/material'
import { AiOutlineSave } from 'react-icons/ai'
import { MdDeleteOutline, MdModeEdit, MdOutlineAdd } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useConfirmDialog } from '@/utils/hooks/useConfirmDialogContext'
import { enumToOptions, formatToISOString } from '@/utils/transformers'
import { useTranslation } from 'react-i18next'
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { tr as locale } from 'date-fns/locale'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'

interface BaseGridProps {
  employeeId?: number
}

interface EditableEmployeeVacationProps extends VacationBaseProps {
  isNew?: boolean
}

interface EditToolbarProps {
  setRows: (
    newRows: (oldRows: GridRowsProp<EditableEmployeeVacationProps>) => GridRowsProp<EditableEmployeeVacationProps>
  ) => void
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void
}

const dateAdapter = new AdapterDateFns({ locale })

//todo: time zone issue, conversion between toISOString and Date
export const VacationGrid = (props: BaseGridProps) => {
  const { t } = useTranslation()
  const { employeeId } = props
  const queryClient = useQueryClient()
  const { openDialog } = useConfirmDialog()
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})

  const { data, isLoading } = useQuery({
    queryKey: ['employeeVacation', employeeId],
    queryFn: () =>
      apiRequest<ApiResponse<VacationBaseProps>>({
        endpoint: 'employeeVacation',
        payload: {
          filter: '',
          sort: 'id,desc',
          page: 0,
          pageSize: 200
        },
        params: { employeeId: employeeId?.toString() ?? '' }
      }),
    enabled: !!employeeId,
    select: (res) => res.data
  })

  const [rows, setRows] = useState(data ? (data as GridRowsProp<EditableEmployeeVacationProps>) : [])

  const EditToolbar = (props: EditToolbarProps) => {
    const { setRows, setRowModesModel } = props

    const handleAddRecord = () => {
      const id = Date.now()
      setRows((oldRows) => [
        ...oldRows,
        {
          id,
          personnel: { id: 0, name: '' },
          startDateTime: new Date(),
          endDateTime: new Date(),
          timeOffType: VacationType.Vacation,
          isNew: true,
          workingHours: 8,
          workingDays: 1
        }
      ])
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'startDateTime' }
      }))
    }

    return (
      <GridToolbarContainer sx={{ p: 2 }}>
        <Button
          disabled={rows.some((r) => r.isNew)}
          color='primary'
          startIcon={<MdOutlineAdd />}
          variant='outlined'
          size={'small'}
          onClick={handleAddRecord}
        >
          {t('common:leaveAdd')}
        </Button>
      </GridToolbarContainer>
    )
  }

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
    mutationFn: async (timeOff: VacationBaseProps) => {
      return await apiRequest({
        endpoint: 'employeeVacationUpdate',
        method: 'PUT',
        params: { employeeId: employeeId?.toString() ?? '0', timeOffId: timeOff.id?.toString() ?? '' },
        payload: timeOff
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employeeVacation'] })
      toast.success('Vacation Updated')
    }
  })

  const { mutateAsync: addVacation } = useMutation({
    mutationFn: (values: VacationBaseProps) =>
      apiRequest({
        endpoint: 'employeeVacationAdd',
        params: { employeeId: employeeId?.toString() ?? '0' },
        payload: {
          startDateTime: formatToISOString(values.startDateTime as string),
          endDateTime: formatToISOString(values.endDateTime as string),
          workingDays: values.workingDays,
          workingHours: values.workingHours,
          timeOffType: values.timeOffType,
          unPaid: values.unPaid
        }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employeeVacation'] })
      toast.success('Vacation Created')
    },
    onError: (err) => console.log(err)
  })

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = (newRow: EditableEmployeeVacationProps) => () => {
    const id = newRow.id ?? 0

    setRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View }
    }))
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

    const editedRow = rows.find((row) => row.id === id)
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id))
    }
  }

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel)
  }

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const processRowUpdate = (newRow: GridRowModel<EditableEmployeeVacationProps>) => {
    const id = newRow.id ?? 0

    const vacationDetails: VacationBaseProps = {
      id,
      personnel: { id: employeeId || 0, name: '' },
      startDateTime: newRow.startDateTime instanceof Date ? newRow.startDateTime.toISOString() : newRow.startDateTime,
      endDateTime: newRow.endDateTime instanceof Date ? newRow.endDateTime.toISOString() : newRow.endDateTime,
      workingDays: newRow.workingDays,
      workingHours: newRow.workingHours,
      timeOffType: newRow.timeOffType,
      unPaid: newRow.unPaid
    }

    if (newRow.isNew) {
      addVacation(vacationDetails)
    } else {
      updateVacation(vacationDetails)
    }

    const updatedRow = { ...newRow, isNew: false }
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
    return updatedRow
  }

  useEffect(() => {
    if (data) {
      setRows(data as GridRowsProp<VacationBaseProps>)
    }
  }, [data])

  /*  const dateColumnType: GridColTypeDef<Date, string> = {
    ...GRID_DATE_COL_DEF,
    resizable: false,
    renderEditCell: (params) => {
      return <GridEditDateCell {...params} />
    },
    filterOperators: getGridDateOperators(false).map((item) => ({
      ...item,
      InputComponent: GridFilterDateInput,
      InputComponentProps: { showTime: false }
    })),
    valueFormatter: (value) => {
      if (value) {
        return dateAdapter.format(value, 'keyboardDate')
      }
      return ''
    }
  }*/

  const GridEditDateInput = styled(InputBase)({
    fontSize: 'inherit',
    padding: '0 9px'
  })

  function WrappedGridEditDateInput(props: TextFieldProps) {
    const { InputProps, ...other } = props
    return (
      <GridEditDateInput
        fullWidth
        {...InputProps}
        {...(other as InputBaseProps)}
      />
    )
  }

  function GridEditDateCell({ id, field, value, colDef }: GridRenderEditCellParams<any, Date | null, string>) {
    const apiRef = useGridApiContext()

    const Component = colDef.type === 'dateTime' ? DateTimePicker : DatePicker

    const handleChange = (newValue: unknown) => {
      apiRef.current.setEditCellValue({ id, field, value: newValue })
    }

    return (
      <Component
        value={value}
        autoFocus
        onChange={handleChange}
        slots={{ textField: WrappedGridEditDateInput }}
      />
    )
  }

  function GridFilterDateInput(props: GridFilterInputValueProps & { showTime?: boolean }) {
    const { item, showTime, applyValue, apiRef } = props

    const Component = showTime ? DateTimePicker : DatePicker

    const handleFilterChange = (newValue: unknown) => {
      applyValue({ ...item, value: newValue })
    }

    return (
      <Component
        value={item.value ? new Date(item.value) : null}
        autoFocus
        label={apiRef.current.getLocaleText('filterPanelInputLabel')}
        slotProps={{
          textField: {
            variant: 'standard'
          },
          inputAdornment: {
            sx: {
              '& .MuiButtonBase-root': {
                marginRight: -1
              }
            }
          }
        }}
        onChange={handleFilterChange}
      />
    )
  }

  const dateTimeColumnType: GridColTypeDef<Date, string> = {
    ...GRID_DATETIME_COL_DEF,
    resizable: false,
    renderEditCell: (params) => {
      return <GridEditDateCell {...params} />
    },
    filterOperators: getGridDateOperators(true).map((item) => ({
      ...item,
      InputComponent: GridFilterDateInput,
      InputComponentProps: { showTime: true }
    })),
    valueFormatter: (value) => {
      if (value) {
        return dateAdapter.format(value, 'keyboardDateTime')
      }
      return ''
    }
  }

  const columns: GridColDef[] = [
    {
      field: 'startDateTime',
      valueGetter: (value) => new Date(value),
      headerName: t('common:vacationStart'),
      ...dateTimeColumnType,
      width: 230,
      editable: true
    },
    {
      field: 'endDateTime',
      valueGetter: (value) => new Date(value),
      headerName: t('common:vacationEnd'),
      ...dateTimeColumnType,
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
    { field: 'unPaid', headerName: t('common:unPaid'), type: 'boolean', editable: true },
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
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={locale}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          loading={isLoading}
          slotProps={{
            loadingOverlay: {
              variant: 'linear-progress',
              noRowsVariant: 'linear-progress'
            },
            toolbar: { setRows, setRowModesModel }
          }}
          editMode='row'
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onProcessRowUpdateError={(err) => console.log(err)}
          processRowUpdate={processRowUpdate}
          onRowEditStop={handleRowEditStop}
          slots={{
            toolbar: EditToolbar as GridSlots['toolbar']
          }}
        />
      </LocalizationProvider>
    </Box>
  )
}
