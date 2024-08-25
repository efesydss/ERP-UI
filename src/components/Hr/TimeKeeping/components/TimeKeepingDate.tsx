import { EmployeeTimeKeepingSpan } from '@/components/Hr/TimeKeeping/typesTimeKeeping'
import { useFormikContext } from 'formik'
import { Box, Button } from '@mui/material'
import { Input } from '@/components/Common/Form/Input/Input'
import { BaseSelect } from '@/components/Common/Form/Select/BaseSelect'
import { t } from 'i18next'
import { PiFlag } from 'react-icons/pi'
import { useAvailableEmployees } from '@/components/Hr/TimeKeeping/useAvailableEmployees'

export const TimeKeepingDate = () => {
  const { values } = useFormikContext<EmployeeTimeKeepingSpan>()
  const { year, month, employee } = values

  const { employeeList, isLoadingState } = useAvailableEmployees(year, month)

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'flex-end' }}>
      <Input
        name={'year'}
        type={'number'}
      />
      <Input
        name={'month'}
        type={'number'}
      />
      <BaseSelect
        name={'employee'}
        options={employeeList}
        isLoading={isLoadingState}
        placeholder={t('common:placeholders.employeeSelect')}
      />
      <Button
        type={'submit'}
        color={'primary'}
        variant={'contained'}
        size={'small'}
        startIcon={<PiFlag />}
        disabled={isLoadingState || !employee}
      >
        {t('common:createTimeKeeping')}
      </Button>
    </Box>
  )
}
