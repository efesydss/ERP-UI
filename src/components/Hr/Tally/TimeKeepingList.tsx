import { BaseForm } from '@/components/Common/Form/BaseForm'
import { EmployeeTimeKeepingDateSet } from '@/components/Hr/Tally/components/EmployeeTimeKeepingDateSet'
import * as yup from 'yup'
import { EmployeeTimeKeepingProps, EmployeeTimeKeepingSpan } from '@/components/Hr/Tally/typesTimeKeeping'
import { getCurrentMonth, getCurrentYear } from '@/utils/dateTimeUtils'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'
import { EmployeeTimeKeepingDetails } from '@/components/Hr/Tally/components/EmployeeTimeKeepingDetails'

const initialTimeKeepSelectValues: EmployeeTimeKeepingSpan = {
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
      apiRequest<EmployeeTimeKeepingProps>({
        endpoint: 'timeKeepingDraft',
        method: 'GET',
        params: { employeeId: draftProperties?.id || '', year: draftProperties?.year || '', month: draftProperties?.month || '' }
      }),
    enabled: !!draftProperties?.id
  })

  /*  const { data: timeKeepings } = useQuery({
    queryKey: ['timeKeepings', draftProperties],
    queryFn: () =>
      apiRequest<EmployeeTimeKeepingProps>({
        endpoint: 'timeKeepings',
        payload: {
          filter: '',
          page: 0,
          pageSize: 200
        }
      })
  })*/

  return (
    <>
      <BaseForm
        initialValues={initialTimeKeepSelectValues}
        validationSchema={validationSchema}
        onSubmit={(values: EmployeeTimeKeepingSpan) => {
          setDraftProperties({
            id: values.employee.id.toString(),
            year: values.year.toString(),
            month: values.month.toString()
          })
        }}
        component={<EmployeeTimeKeepingDateSet />}
      />

      {data && <EmployeeTimeKeepingDetails data={data} />}
    </>
  )
}
