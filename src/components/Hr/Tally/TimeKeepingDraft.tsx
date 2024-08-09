import { EmployeeTimeKeepingProps, EmployeeTimeKeepingSpan } from '@/components/Hr/Tally/typesTimeKeeping'
import { getCurrentMonth, getCurrentYear } from '@/utils/dateTimeUtils'
import * as yup from 'yup'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { EmployeeTimeKeepingDateSet } from '@/components/Hr/Tally/components/EmployeeTimeKeepingDateSet'
import { TimeKeepingDraftDetails } from '@/components/Hr/Tally/components/TimeKeepingDraftDetails'

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

export const TimeKeepingDraft = () => {
  const [draftProperties, setDraftProperties] = useState<DraftProps>()

  const { data, isLoading: isDraftDetailLoading } = useQuery({
    queryKey: ['employeeTimeKeeping', draftProperties],
    queryFn: () =>
      apiRequest<EmployeeTimeKeepingProps>({
        endpoint: 'timeKeepingDraft',
        method: 'GET',
        params: {
          employeeId: draftProperties?.id || '',
          year: draftProperties?.year || '',
          month: draftProperties?.month || ''
        }
      }),
    enabled: !!draftProperties?.id
  })

  return (
    <>
      <BaseForm
        initialValues={initialTimeKeepSelectValues}
        validationSchema={validationSchema}
        onSubmit={(values: EmployeeTimeKeepingSpan) => {
          //todo: employee can be null, so can be the id
          setDraftProperties({
            id: values.employee.id.toString(),
            year: values.year.toString(),
            month: values.month.toString()
          })
        }}
        component={<EmployeeTimeKeepingDateSet isLoading={isDraftDetailLoading} />}
      />

      {data && <TimeKeepingDraftDetails data={data} />}
    </>
  )
}
