import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'
import { EmployeeResponse } from '@/components/Hr/Employees/typesEmployee'
import { AxiosError } from 'axios'
import { Route as RouteList } from '@/routes/_authenticated/hr/employees'
import { toast } from 'react-toastify'
import { useNavigate } from '@tanstack/react-router'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { FormEmployeeSubRow } from '@/components/Hr/Employees/components/FormEmployeeSubRow'
import { employeeValidationSchema } from '@/components/Hr/Employees/schemaEmployees'
import { Row } from '@tanstack/react-table'
import { MouseEvent } from 'react'

interface DetailsSubRowProps<TData> {
  employeeId?: number
  row?: Row<TData>
  handleExpandRow?: (e: MouseEvent | null, rowId: string) => void
}

export const DetailsSubRow = <TData,>(props: DetailsSubRowProps<TData>) => {
  const { employeeId, handleExpandRow, row } = props
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['employeeDetails', employeeId],
    queryFn: () =>
      apiRequest<EmployeeResponse>({
        endpoint: 'employee',
        method: 'GET',
        id: employeeId
      }),
    enabled: !!employeeId
  })

  const updateEmployee = async (employee: EmployeeResponse) => {
    return await apiRequest<EmployeeResponse>({
      endpoint: 'employee',
      method: 'PUT',
      id: employeeId,
      payload: employee
    })
  }

  const { mutateAsync } = useMutation({
    mutationFn: updateEmployee,
    onError: (err: AxiosError) => {
      console.log('mutateAsync', err)
    },
    onSuccess: (data) => {
      navigate({ to: RouteList.fullPath })
      queryClient.invalidateQueries({ queryKey: ['employees'], refetchType: 'all' })
      toast.success(`${data.name} ${data.surname} güncellendi`)
      if (row && handleExpandRow) {
        handleExpandRow(null, row.id)
      }
    }
  })

  const onFormSubmit = async (values: EmployeeResponse) => {
    console.log('values -->', values)

    await mutateAsync(values)
  }

  if (!data) {
    return null
  }

  return (
    <>
      <BaseForm<EmployeeResponse>
        initialValues={data}
        validationSchema={employeeValidationSchema}
        component={<FormEmployeeSubRow />}
        onSubmit={onFormSubmit}
      />
    </>
  )
}
