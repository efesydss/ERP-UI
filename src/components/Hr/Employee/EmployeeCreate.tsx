import { FormEmployeeDetail } from '@/components/Hr/Employee/FormEmployeeDetail'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { CivilStatus, Employee } from '@/components/Hr/Employee/typesEmployee'
import { useMutation } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

const initialPersonnel: Employee = {
  identificationNumber: '123588',
  name: 'John2',
  surname: 'Doe2',
  department: 'Engineering',
  profession: 'software_developer',
  emergencyPhone: '555-555-5555',
  emergencyName: 'Jane Doe',
  startDate: '2023-07-01',
  endDate: '2024-11-30',
  phone: '555-555-5555',
  email: 'john.doe@example.com',
  serialNumber: '55226',
  fathersName: 'Ahmet',
  mothersName: 'Fatma',
  birthPlace: 'Istanbul',
  birthDate: '1990-01-01',
  civilStatus: CivilStatus.Married,
  city: 'Istanbul',
  province: 'Kadikoy',
  state: 'Marmara',
  street: 'Ataturk Street',
  volumeNumber: '10',
  familySerial: 'A123456'
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
