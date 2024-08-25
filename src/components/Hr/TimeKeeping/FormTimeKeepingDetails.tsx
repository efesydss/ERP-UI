import { Box, Button } from '@mui/material'
import { useFormikContext } from 'formik'
import { EmployeeTimeKeepingProps } from '@/components/Hr/TimeKeeping/typesTimeKeeping'
import { useMutation } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'
import { DynamicFieldsAccordion } from '@/components/Hr/TimeKeeping/components/DynamicFieldsAccordion'
import { t } from 'i18next'
import { toast } from 'react-toastify'
import { useUpdateTotal } from '@/components/Hr/TimeKeeping/useUpdateTotal'

interface FormTimeKeepingDetailsProps {
  onSetTotalPayment: (total: number) => void
  totalPayment: number
}

export const FormTimeKeepingDetails = (props: FormTimeKeepingDetailsProps) => {
  const { onSetTotalPayment, totalPayment } = props
  const { values } = useFormikContext<EmployeeTimeKeepingProps>()

  const { updatedValues } = useUpdateTotal({ values, onUpdateTotalPayment: onSetTotalPayment })

  const { mutateAsync: updateTimeKeeping } = useMutation({
    mutationFn: (values: EmployeeTimeKeepingProps) =>
      apiRequest({
        endpoint: 'timeKeepingUpdate',
        payload: { ...values, total: totalPayment },
        method: 'PUT',
        id: values.id
      }),
    onSuccess: () => toast.success('Puantaj Güncellendi')
  })

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <DynamicFieldsAccordion />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          variant={'contained'}
          onClick={() => updateTimeKeeping(updatedValues)}
        >
          {t('common:update')}
        </Button>
      </Box>
    </>
  )
}
