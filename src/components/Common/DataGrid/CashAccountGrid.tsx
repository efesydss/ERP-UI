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
import { Box, Button, InputBase, InputBaseProps, styled, TextFieldProps } from '@mui/material'
import { AiOutlineSave } from 'react-icons/ai'
import { MdDeleteOutline, MdModeEdit, MdOutlineAdd } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { tr as locale } from 'date-fns/locale'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { useTranslation } from 'react-i18next'
import { useConfirmDialog } from '@/utils/hooks/useConfirmDialogContext'
import { formatToISOString, enumToOptions } from '@/utils/transformers'
import { Currency } from '@/components/Hr/Employees/typesEmployee'
import { CashAccountBaseProps } from '@/components/Accounting/typesCashAccount'

interface BaseGridProps {
  cashAccountId?: number
}

interface EditableCashAccountProps extends CashAccountBaseProps {
  isNew?: boolean
}

interface EditToolbarProps {
  setRows: (
    newRows: (oldRows: GridRowsProp<EditableCashAccountProps>) => GridRowsProp<EditableCashAccountProps>
  ) => void
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void
}

const dateAdapter = new AdapterDateFns({ locale })

//todo: time zone issue, conversion between toISOString and Date
export const CashAccountGrid = (props: BaseGridProps) => {
  const { t } = useTranslation()
  const { cashAccountId } = props
  const queryClient = useQueryClient()
  const { openDialog } = useConfirmDialog()
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})

  const { data, isLoading } = useQuery({
    queryKey: ['cashAccounts', cashAccountId],
    queryFn: () =>
      apiRequest<ApiResponse<CashAccountBaseProps>>({
        endpoint: 'cashAccounts',
        payload: {
          filter: '',
          sort: 'id,desc',
          page: 0,
          pageSize: 200
        },
        params: { employeeId: cashAccountId?.toString() ?? '' }
      }),
    enabled: !!cashAccountId,
    select: (res) => res.data
  })

  const [rows, setRows] = useState(data ? (data as GridRowsProp<EditableCashAccountProps>) : [])

  const EditToolbar = (props: EditToolbarProps) => {
    const { setRows, setRowModesModel } = props

    const handleAddRecord = () => {
      const id = 1
      setRows((oldRows) => [
        ...oldRows,/** code: string
        name: string
        currency: Currency */
        {
          id,
          code: '1',
          name: 'efe',
          currency: Currency.TRY
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
  const { mutate: deleteCashAccount } = useMutation({
    mutationFn: async (cashAccountId: string) => {
      return await apiRequest({
        endpoint: 'cashAccountDelete',
        method: 'DELETE',
        params: { cashAccountId: cashAccountId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cashAccount'] })
      toast.success('Cash Account Deleted')
    }
  })

  const { mutate: updateCashAccount } = useMutation({
    mutationFn: async (cashAccount: CashAccountBaseProps) => {
      return await apiRequest({
        endpoint: 'cashAccountUpdate',
        method: 'PUT',
        params: {
          cashAccountId: cashAccount.id?.toString() ?? '0'
        },
        payload: cashAccount
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cashAccount'] })
      toast.success('Cash Account Updated')
    }
  })

  const { mutateAsync: addCashAccount } = useMutation({
    mutationFn: (values: CashAccountBaseProps) =>
      apiRequest({
        endpoint: 'cashAccount',
        params: {
          cashAccountId: values.id?.toString() ?? '0'
        },
        payload: {
          code: values.code,
          name: values.name,
          currency: values.currency
        }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cashAccount'] })
      toast.success('Cash Account Created')
    },
    onError: (err) => console.log(err)
  })


  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = (newRow: EditableCashAccountProps) => () => {
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
        deleteCashAccount(id.toString())
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

  const processRowUpdate = (newRow: GridRowModel<EditableCashAccountProps>) => {
    const id = newRow.id ?? 0

    const cashAccountDetails: CashAccountBaseProps = {
      id,
      code: newRow.code, // yeni satırdan code bilgisi
      name: newRow.name, // yeni satırdan name bilgisi
      currency: newRow.currency, // yeni satırdan currency bilgisi
      // Eğer CashAccount için gerekli başka alanlar varsa buraya ekle
    }


    if (newRow.isNew) {
      addCashAccount(cashAccountDetails)
    } else {
      updateCashAccount(cashAccountDetails)
    }

    const updatedRow = { ...newRow, isNew: false }
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
    return updatedRow
  }

  useEffect(() => {
    if (data) {
      setRows(data as GridRowsProp<CashAccountBaseProps>)
    }
  }, [data])


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

  //TODO erkanAbi buraya beraber bakalımmı ? 
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
      field: 'code',
      headerName: t('common:cashAccountCode'),
      width: 150,
      editable: true
    },
    {
      field: 'name',
      headerName: t('common:cashAccountName'),
      width: 230,
      editable: true
    },
    {
      field: 'currency',
      headerName: t('common:currency'),
      valueOptions: enumToOptions(Currency), // Currency enum'undan değerler
      type: 'singleSelect',
      width: 150,
      editable: true
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