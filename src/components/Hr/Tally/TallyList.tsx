import { BaseForm } from '@/components/Common/Form/BaseForm'
import { EmployeeTally } from '@/components/Hr/Tally/components/EmployeeTally'
import * as yup from 'yup'
import { EmployeeTallySpan } from '@/components/Hr/Tally/typesTally'
import { getCurrentMonth, getCurrentYear } from '@/utils/dateTimeUtils'
import { BaseTable } from '@/components/Common/Table/BaseTable'
import { useState } from 'react'

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

export const TallyList = () => {
  const [draftProperties, setDraftProperties] = useState<DraftProps>()

  console.log('draftProperties -->', draftProperties)

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
        component={<EmployeeTally />}
      />
      {draftProperties && (
        <BaseTable
          endpoint={'timeKeepingDraft'}
          params={{
            employeeId: draftProperties.id,
            year: draftProperties.year,
            month: draftProperties.month
          }}
          method='GET'
          columns={[]}
        />
      )}
    </>
  )
}
