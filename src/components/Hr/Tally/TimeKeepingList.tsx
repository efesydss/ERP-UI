import { BaseForm } from '@/components/Common/Form/BaseForm'
import { EmployeeTimeKeepingDateSet } from '@/components/Hr/Tally/components/EmployeeTimeKeepingDateSet'
import * as yup from 'yup'
import { EmployeeTallyProps, EmployeeTallySpan } from '@/components/Hr/Tally/typesTimeKeeping'
import { getCurrentMonth, getCurrentYear } from '@/utils/dateTimeUtils'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'
import { EmployeeTimeKeepingDetails } from '@/components/Hr/Tally/components/EmployeeTimeKeepingDetails'
import { Divider } from '@mui/material'

const initialTimeKeepSelectValues: EmployeeTallySpan = {
  employee: { id: 0, name: '' },
  year: getCurrentYear(),
  month: getCurrentMonth()
}

interface DraftProps {
  id: string
  year: string
  month: string
}

const validationSchema = yup.object({
  employee: yup
    .object({
      id: yup.number().required(),
      name: yup.string().required()
    })
    .required('Employee is required'),
  year: yup.number().required(),
  month: yup.number().required()
})

export const TimeKeepingList = () => {
  const [draftProperties, setDraftProperties] = useState<DraftProps>()

  const { data } = useQuery({
    queryKey: ['employeeTimeKeeping', draftProperties],
    queryFn: () =>
      apiRequest<EmployeeTallyProps>({
        endpoint: 'timeKeepingDraft',
        method: 'GET',
        params: { employeeId: draftProperties?.id || '', year: draftProperties?.year || '', month: draftProperties?.month || '' }
      }),
    enabled: !!draftProperties?.id
  })

  console.log('data -->', data)

  return (
    <>
      <BaseForm
        initialValues={initialTimeKeepSelectValues}
        validationSchema={validationSchema}
        onSubmit={(values: EmployeeTallySpan) => {
          setDraftProperties({
            id: values.employee.id.toString(),
            year: values.year.toString(),
            month: values.month.toString()
          })
        }}
        component={<EmployeeTimeKeepingDateSet />}
      />

      {data && (
        <>
          <Divider sx={{ my: 4 }} />
          <EmployeeTimeKeepingDetails data={data} />
        </>
      )}
    </>
  )
}
