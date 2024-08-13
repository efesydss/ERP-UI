import { BaseForm } from '@/components/Common/Form/BaseForm'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'
import { EmployeeResponse } from '@/components/Hr/Employees/typesEmployee'
import { Route as RouteDetail } from '@/routes/_authenticated/hr/employees/$id'
import { Route as RouteList } from '@/routes/_authenticated/hr/employees'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { Container } from '@mui/material'
import { FormEmployee } from '@/components/Hr/Employees/FormEmployee'
import { useNavigate } from '@tanstack/react-router'

export const EmployeeDetails = () => {
  const { id } = RouteDetail.useParams()
  const data = RouteDetail.useLoaderData()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const updateEmployee = async (employee: EmployeeResponse) => {
    return await apiRequest<EmployeeResponse>({
      endpoint: 'employee',
      method: 'PUT',
      id,
      payload: employee
    })
  }

  const { mutateAsync } = useMutation({
    mutationFn: updateEmployee,
    onError: (err: AxiosError) => {
      console.log('mutateAsync', err)
    },
    onSuccess: () => {
      navigate({ to: RouteList.fullPath })
      queryClient.invalidateQueries({ queryKey: ['employee'], refetchType: 'all' })
      toast.success('Employee Updated')
    }
  })

  const onFormSubmit = async (values: EmployeeResponse) => {
    await mutateAsync(values)
  }

  return (
    <Container>
      <BaseForm
        initialValues={data}
        component={<FormEmployee employeeId={id} />}
        onSubmit={onFormSubmit}
      />
    </Container>
  )
}
