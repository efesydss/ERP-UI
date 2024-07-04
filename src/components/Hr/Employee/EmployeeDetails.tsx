import { Box, Tab, Tabs } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { FormEmployeeDetail } from '@/components/Hr/Employee/FormEmployeeDetail'
import { useMutation, useQuery } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'
import { Employee } from '@/components/Hr/Employee/typesEmployee'
import { Route } from '@/routes/_authenticated/hr/employees/$id'
import { AxiosError } from 'axios'

export const EmployeeDetails = () => {
  const { t: hr } = useTranslation('hr')
  const [value, setValue] = useState(0)
  const { id } = Route.useParams()

  const { data } = useQuery({
    queryKey: ['employee', id],
    enabled: !!id,
    queryFn: () =>
      apiRequest<Employee>({
        method: 'GET',
        endpoint: 'employee',
        id
      })
  })

  const updateEmployee = async (employee: Employee) => {
    const res = await apiRequest<Employee>({
      endpoint: 'employee',
      method: 'PUT',
      id,
      payload: employee
    })

    return res
  }

  const { mutateAsync } = useMutation({
    mutationFn: updateEmployee,
    onError: (err: AxiosError) => {
      console.log('mutateAsync', err)
    },
    onSuccess: () => console.log('success')
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

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const onFormSubmit = async (values: Employee) => {
    console.log('values -->', values)
    await mutateAsync(values)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
        >
          <Tab label={hr('infoGeneral')} />
          <Tab label={hr('infoIdentity')} />
          <Tab label={hr('infoPayroll')} />
        </Tabs>
      </Box>
      {data && (
        <BaseForm
          initialValues={data}
          //validationSchema={validationSchema}
          component={<FormEmployeeDetail value={value} />}
          onSubmit={onFormSubmit}
        />
      )}
    </Box>
  )
}
