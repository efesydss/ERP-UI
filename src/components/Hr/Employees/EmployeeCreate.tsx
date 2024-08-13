import { BaseForm } from '@/components/Common/Form/BaseForm'
import { CivilStatus, Currency, EmployeeResponse } from '@/components/Hr/Employees/typesEmployee'
import { useMutation } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { FormEmployee } from '@/components/Hr/Employees/FormEmployee'
import { useNavigate } from '@tanstack/react-router'
import { Route } from '@/routes/_authenticated/hr/employees'
import { Container } from '@mui/material'

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
  birthDate: '',
  civilStatus: CivilStatus.Married,
  city: '',
  province: '',
  state: '',
  street: '',
  volumeNumber: '',
  familySerial: '',
  payrollData: {
    currency: Currency.TRY,
    salary: 40000,
    iban: 'TR8080'
  }
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
    <Container>
      <BaseForm
        initialValues={initialPersonnel}
        component={<FormEmployee />}
        onSubmit={onFormSubmit}
      />
    </Container>
  )
}
