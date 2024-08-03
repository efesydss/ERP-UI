import { BaseForm } from '@/components/Common/Form/BaseForm'
import { CivilStatus, EmployeeResponse } from '@/components/Hr/Employees/typesEmployee'
import { useMutation } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { FormEmployeeCreate } from '@/components/Hr/Employees/FormEmployeeCreate'
import { useNavigate } from '@tanstack/react-router'
import { Route } from '@/routes/_authenticated/hr/employees'

const initialPersonnel: EmployeeResponse = {
  id: 0,
  identificationNumber: '',
  name: '',
  surname: '',
  companyBranch: { id: 0, name: '' },
  department: { id: 0, name: '' },
  profession: '',
  emergencyPhone: '',
  emergencyName: '',
  startDate: '',
  endDate: '',
  phone: '',
  email: '',
  serialNumber: '',
  fathersName: '',
  mothersName: '',
  birthPlace: '',
  birthDate: new Date(),
  civilStatus: CivilStatus.Married,
  city: '',
  province: '',
  state: '',
  street: '',
  volumeNumber: '',
  familySerial: ''
}

export const EmployeeCreate = () => {
  const navigate = useNavigate()

  const { mutateAsync } = useMutation({
    mutationFn: (values: EmployeeResponse) =>
      apiRequest({
        endpoint: 'employee',
        payload: values
      }),
    onSuccess: () => {
      navigate({ to: Route.fullPath })
      toast.success('Employee Created')
    },
    onError: (
      err: AxiosError<{
        err?: string
      }>
    ) => {
      if (err.response?.status === 409) {
        console.log(err.response)
        toast.error('exist')
      } else {
        toast.error('error')
      }
    }
  })

  const onFormSubmit = async (values: EmployeeResponse) => {
    await mutateAsync(values)
  }

  return (
    <BaseForm
      initialValues={initialPersonnel}
      component={<FormEmployeeCreate />}
      onSubmit={onFormSubmit}
    />
  )
}
