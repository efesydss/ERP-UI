import { EmployeeTallyProps } from '@/components/Hr/Tally/typesTimeKeeping'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { FormEmployeeTimeKeeping } from '@/components/Hr/Tally/FormEmployeeTimeKeeping'
import { Typography } from '@mui/material'

interface EmployeeTimeKeepingDetailsProps {
  data: EmployeeTallyProps
}

export const EmployeeTimeKeepingDetails = (props: EmployeeTimeKeepingDetailsProps) => {
  return (
    <>
      <Typography sx={{ mb: 3 }}>{props.data.title}</Typography>
      <BaseForm
        initialValues={props.data}
        onSubmit={(v) => console.log(v)}
        component={<FormEmployeeTimeKeeping />}
      />
    </>
  )
}
