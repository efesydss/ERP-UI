import { Route } from '@/routes/_authenticated/hr/timekeeping/$id'
import { Box, Paper, Typography } from '@mui/material'
import { t } from 'i18next'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { EmployeeTimeKeepingProps } from '@/components/Hr/TimeKeeping/typesTimeKeeping'
import { FormTimeKeepingDetails } from '@/components/Hr/TimeKeeping/FormTimeKeepingDetails'

export const TimeKeepingDetails = () => {
  //const { id } = Route.useParams()
  const data = Route.useLoaderData()

  const {
    title,
    total,
    employee: { name, surname, companyBranch, department }
  } = data

  const onFormSubmit = async (values: EmployeeTimeKeepingProps) => {
    console.log(values)
  }

  return (
    <>
      <Paper sx={{ p: 2, mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant={'h5'}>
            {name} {surname}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            {companyBranch.name} {t('hr:branchSuffix')}, {department.name} {t('hr:departmentSuffix')}
          </Typography>
          <Typography sx={{ fontSize: '.9rem' }}>{title}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
          <Typography>Net Ödenecek Tutar</Typography>
          <Typography variant={'h5'}>{total}</Typography>
        </Box>
      </Paper>
      <BaseForm
        initialValues={data}
        onSubmit={onFormSubmit}
        component={<FormTimeKeepingDetails />}
      />
    </>
  )
}
