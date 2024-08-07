import { EmployeeTimeKeepingProps } from '@/components/Hr/Tally/typesTimeKeeping'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { FormEmployeeTimeKeeping } from '@/components/Hr/Tally/FormEmployeeTimeKeeping'
import { Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'

interface EmployeeTimeKeepingDetailsProps {
  data: EmployeeTimeKeepingProps
}

export const EmployeeTimeKeepingDetails = (props: EmployeeTimeKeepingDetailsProps) => {
  const { t: hr } = useTranslation('hr')

  const {
    data: {
      title,
      year,
      month,
      employee: { name, surname, companyBranch, department }
    }
  } = props

  const { mutateAsync } = useMutation({
    mutationFn: (newTimeKeep: any) =>
      apiRequest({
        endpoint: 'timeKeepingCreate',
        payload: newTimeKeep
      })
  })

  const onFormSubmit = async (values: EmployeeTimeKeepingProps) => {
    const { normalWorkingDays, weekendWorkingHours, unpaidTimeOffHours, employee, deductions, additionalPayments, overtimes, total, netSalary, timeOffs } =
      values

    const newTimeKeep = {
      year,
      month,
      title,
      timeOffs,
      netSalary,
      total,
      normalWorkingDays,
      weekendWorkingHours,
      unpaidTimeOffHours,
      employee: { id: employee.id },
      deductions,
      additionalPayments,
      overtimes
    }
    console.log('values -->', values)
    console.log('newTimeKeep -->', newTimeKeep)
    await mutateAsync(newTimeKeep)
  }

  return (
    <Paper sx={{ p: 2, mt: 4 }}>
      <Typography sx={{ mb: 1 }}>
        {name} {surname}
      </Typography>
      <Typography sx={{ mb: 5 }}>
        {companyBranch.name} {hr('branchSuffix')}, {department.name} {hr('departmentSuffix')}
      </Typography>
      <Typography sx={{ mb: 2 }}>{title}</Typography>
      <BaseForm
        initialValues={props.data}
        onSubmit={onFormSubmit}
        component={<FormEmployeeTimeKeeping />}
      />
    </Paper>
  )
}
