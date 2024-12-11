import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Route } from '@/routes/_authenticated/admin/machines'
import { AxiosError } from 'axios'
import { Machines } from '@/components/Admin/typesMachines'
import { CivilStatus, Currency, EmployeeResponse } from '@/components/Hr/Employees/typesEmployee'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { FormMachine } from '@/components/Admin/machine/MachineForm'
import { Container } from '@mui/material'
import { t } from 'i18next'
import { apiRequest } from '@/utils/apiDefaults'

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
const initialMachine: Machines = {
  id: 1,
  code: 'CODE X',
  description: 'DESC X',
  employee: initialPersonnel
}
export const MachineAdd = () => {
  const navigate = useNavigate()


  const { mutateAsync } = useMutation({
    mutationFn: (values: Machines) =>

      apiRequest({
        endpoint: 'machineAdd',
        payload: values
      }),


    onSuccess: () => {
      navigate({ to: Route.fullPath })


      toast.success('Machine Created')
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
  const onFormSubmit = async (values: Machines) => {
    await mutateAsync({
      ...values

    })
    console.log('Payload: ', values);
  }

  return (
    <>
      <PageTitle title={t('common:machineAdd')} />
      <Container>
        <BaseForm
          initialValues={initialMachine}
          component={<FormMachine />}
          onSubmit={onFormSubmit}
        />
      </Container>
    </>
  )
}