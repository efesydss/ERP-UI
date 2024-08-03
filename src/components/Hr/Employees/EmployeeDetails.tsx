import { BaseForm } from '@/components/Common/Form/BaseForm'
import { FormEmployeeDetail } from '@/components/Hr/Employees/FormEmployeeDetail'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'
import { EmployeeResponse } from '@/components/Hr/Employees/typesEmployee'
import { Route } from '@/routes/_authenticated/hr/employees/$id'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const EmployeeDetails = () => {
  const { id } = Route.useParams()
  const data = Route.useLoaderData()
  const queryClient = useQueryClient()

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
      queryClient.invalidateQueries({ queryKey: ['employee'] })
      toast.success('Employee Updated')
    }
  })

  /*  const validationSchema = yup.object({
      name: yup.string().required(),
      surname: yup.string().required(),
      email: yup.string().email().required(),
      address: yup.string().required(),
      title: yup.string().required(),
      startDate: yup.date().required(),
      endDate: yup.date().required(),
      homePhone: yup.string().optional(),
      mobilePhone: yup.string().required(),
      bloodType: yup.string().oneOf(Object.values(BloodType)).required()
    })*/

  const onFormSubmit = async (values: EmployeeResponse) => {
    await mutateAsync(values)
  }

  return (
    <BaseForm
      initialValues={data}
      //validationSchema={validationSchema}
      component={<FormEmployeeDetail />}
      onSubmit={onFormSubmit}
    />
  )
}
