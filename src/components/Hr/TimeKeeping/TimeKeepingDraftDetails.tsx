import { EmployeeTimeKeepingProps } from '@/components/Hr/TimeKeeping/typesTimeKeeping'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { FormTimeKeepingDraft } from '@/components/Hr/TimeKeeping/FormTimeKeepingDraft'
import { Box, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'

interface EmployeeTimeKeepingDetailsProps {
  data: EmployeeTimeKeepingProps
}

export const TimeKeepingDraftDetails = (props: EmployeeTimeKeepingDetailsProps) => {
  const { t: hr } = useTranslation('hr')

  const {
    data: {
      title,
      year,
      month,
      total,
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
    const {
      normalWorkingDays,
      weekendWorkingHours,
      unpaidTimeOffHours,
      employee,
      deductions,
      additionalPayments,
      overtimes,
      netSalary,
      timeOffs
    } = values

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
    await mutateAsync(newTimeKeep)
  }

  return (
    <>
      <Paper sx={{ p: 2, mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant={'h5'}>
            {name} {surname}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            {companyBranch.name} {hr('branchSuffix')}, {department.name} {hr('departmentSuffix')}
          </Typography>
          <Typography sx={{ fontSize: '.9rem' }}>{title}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
          <Typography>Net Ödenecek Tutar</Typography>
          <Typography variant={'h5'}>{total}</Typography>
        </Box>
      </Paper>
      <BaseForm
        initialValues={props.data}
        onSubmit={onFormSubmit}
        component={<FormTimeKeepingDraft />}
      />
    </>
  )
}