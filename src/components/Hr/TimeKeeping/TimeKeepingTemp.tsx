import {
  EmployeeTimeKeepingProps,
  EmployeeTimeKeepingSpan,
  TimeKeepingDraftProps
} from '@/components/Hr/TimeKeeping/typesTimeKeeping'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'
import { getCurrentMonth, getCurrentYear } from '@/utils/dateTimeUtils'
import * as yup from 'yup'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { TimeKeepingDate } from '@/components/Hr/TimeKeeping/components/TimeKeepingDate'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { TimeKeepingTempForm } from '@/components/Hr/TimeKeeping/components/TimeKeepingTempForm'

const initialTimeKeepDate: EmployeeTimeKeepingSpan = {
  employee: undefined,
  year: getCurrentYear(),
  month: getCurrentMonth()
}

const timeKeepDateSchema = yup.object({
  employee: yup
    .object({
      id: yup.number().required(),
      name: yup.string().required()
    })
    .required('Employee is required'),
  year: yup.number().required(),
  month: yup.number().required()
})

export const TimeKeepingTemp = () => {
  const [draftProperties, setDraftProperties] = useState<TimeKeepingDraftProps>()

  const { data: draftData } = useQuery({
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
      <PageTitle title={'Yeni Puantaj'} />
      <BaseForm<EmployeeTimeKeepingSpan>
        initialValues={initialTimeKeepDate}
        validationSchema={timeKeepDateSchema}
        onSubmit={(values) =>
          setDraftProperties({
            id: values.employee?.id.toString(),
            year: values.year.toString(),
            month: values.month.toString()
          })
        }
        component={<TimeKeepingDate />}
      />
      {draftData && (
        <BaseForm<EmployeeTimeKeepingProps>
          initialValues={draftData}
          onSubmit={(values) => console.log(values)}
          component={<TimeKeepingTempForm draftData={draftData} />}
        />
      )}
    </>
  )
}
