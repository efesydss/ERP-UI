import { Route } from '@/routes/_authenticated/hr/timekeeping/$id'
import { Box, Paper, Typography } from '@mui/material'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { EmployeeTimeKeepingProps } from '@/components/Hr/TimeKeeping/typesTimeKeeping'
import { FormTimeKeepingDetails } from '@/components/Hr/TimeKeeping/FormTimeKeepingDetails'
import { useState } from 'react'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { useTranslation } from 'react-i18next'

export const TimeKeepingDetails = () => {
  const { t } = useTranslation('common')
  const data = Route.useLoaderData()
  const {
    title,
    total,
    employee: { name, surname, companyBranch, department }
  } = data

  const [totalPayment, setTotalPayment] = useState<number>(total)

  const onFormSubmit = async (values: EmployeeTimeKeepingProps) => {
    console.log(values)
  }

  return (
    <>
      <PageTitle
        title={`${name} ${surname}`}
        subTitle={`${companyBranch.name} ${t('branchSuffix')}, ${department.name} ${t('departmentSuffix')}`}
      />
      <Paper sx={{ p: 2, mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography>{title}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
          <Typography>Net Ödenecek Tutar</Typography>
          <Typography variant={'h5'}>{totalPayment}</Typography>
        </Box>
      </Paper>
      <BaseForm
        initialValues={data}
        onSubmit={onFormSubmit}
        component={
          <FormTimeKeepingDetails
            onSetTotalPayment={setTotalPayment}
            totalPayment={totalPayment}
          />
        }
      />
    </>
  )
}
