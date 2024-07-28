import { FormEmployeeDetail } from '@/components/Hr/Employee/FormEmployeeDetail'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { Employee } from '@/components/Hr/Employee/typesEmployee'
import { useMutation } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

const initialPersonnel: Employee = {
  identificationNumber: '',
  name: '',
  surname: '',
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
  birthDate: '',
  city: '',
  province: '',
  state: '',
  street: '',
  volumeNumber: '',
  familySerial: ''
}

export const EmployeeCreate = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (values: Employee) =>
      apiRequest({
        endpoint: 'employee',
        payload: values
      }),
    onSuccess: () => toast.success('Employee Created'),
    onError: (
      err: AxiosError<{
        err?: string
      }>
    ) => {
      if (err.response?.status === 409) {
        console.log(err.response)
        toast.error('exist')
      } else {
        toast.error('other error')
      }
    }
  })

  const onFormSubmit = async (values: Employee) => {
    console.log('values -->', values)
    await mutateAsync(values)
  }

  return (
    <BaseForm
      initialValues={initialPersonnel}
      component={<FormEmployeeDetail />}
      onSubmit={onFormSubmit}
    />
  )
}
