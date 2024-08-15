import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { BaseSelect } from '@/components/Common/Form/BaseSelect'
import { Box, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { VacationType } from '@/components/Hr/Vacations/typeVacations'
import { DatePicker } from '@/components/Common/Form/DatePicker/DatePicker'
import { enumToOptions } from '@/utils/transformers'
import { Input } from '@/components/Common/Form/Input/Input'
import { Checkbox } from '@/components/Common/Form/Checkbox/Checkbox'
import { t } from 'i18next'

export const FormVacationAdd = () => {
  const { t: common } = useTranslation('common')

  return (
    <>
      <FormGrid>
        <FormGrid widths={'half'}>
          <DatePicker
            name={'startDateTime'}
            isTimeEnabled
          />
          <DatePicker
            name={'endDateTime'}
            isTimeEnabled
          />
          <FormGrid widths={'half'}>
            <BaseSelect
              name={'timeOffType'}
              isEnum
              options={enumToOptions(VacationType, 'hr')}
              nameSpace={'hr'}
            />
            <Checkbox
              name={'unPaid'}
              label={t('hr:unPaid')}
            />
          </FormGrid>

          <FormGrid widths={'half'}>
            <Input
              name={'workingDays'}
              nameSpace={'hr'}
              type={'number'}
            />
            <Input
              name={'workingHours'}
              nameSpace={'hr'}
              type={'number'}
            />
          </FormGrid>
        </FormGrid>
      </FormGrid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type={'submit'}
          color={'primary'}
          variant={'contained'}
        >
          {common('save')}
        </Button>
      </Box>
    </>
  )
}
