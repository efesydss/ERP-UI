import { EmployeeTimeKeepingProps } from '@/components/Hr/TimeKeeping/typesTimeKeeping'
import { DynamicFieldsAccordion } from '@/components/Hr/TimeKeeping/components/DynamicFieldsAccordion'
import { Box, Button, Paper, Typography } from '@mui/material'
import { t } from 'i18next'
import { useFormikContext } from 'formik'
import { apiRequest } from '@/utils/apiDefaults'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Route } from '@/routes/_authenticated/hr/timekeeping'
import { toast } from 'react-toastify'
import { useUpdateTotal } from '@/components/Hr/TimeKeeping/useUpdateTotal'

interface TimeKeepingTempFormProps {
  draftData: EmployeeTimeKeepingProps
}

export const TimeKeepingTempForm = (props: TimeKeepingTempFormProps) => {
  const {
    draftData: {
      title,
      employee: { name, surname, companyBranch, department }
    }
  } = props

  const { values } = useFormikContext<EmployeeTimeKeepingProps>()
  const navigate = useNavigate()

  const { totalPayment, updatedValues } = useUpdateTotal({ values })

  const { mutateAsync: createTimeKeep } = useMutation({
    mutationFn: (newTimeKeep: EmployeeTimeKeepingProps) =>
      apiRequest({
        endpoint: 'timeKeepingCreate',
        payload: { ...newTimeKeep, total: totalPayment }
      }),
    onSuccess: () => {
      toast.success('Puantaj olusturuldu')
      navigate({ to: Route.fullPath })
    }
  })

  return (
    <>
      <Paper sx={{ p: 2, mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Typography variant={'h5'}>
            {name} {surname}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            {companyBranch.name} {t('branchSuffix')}, {department.name} {t('departmentSuffix')}
          </Typography>
          <Typography>{title}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
          <Typography>Net Ödenecek Tutar</Typography>
          <Typography variant={'h5'}>{totalPayment}</Typography>
        </Box>
      </Paper>
      <DynamicFieldsAccordion />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          variant={'contained'}
          onClick={() => {
            console.log(updatedValues)
            createTimeKeep(updatedValues)
          }}
        >
          {t('common:save')}
        </Button>
      </Box>
    </>
  )
}
