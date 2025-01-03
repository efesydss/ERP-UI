import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { DatePicker } from '@/components/Common/Form/DatePicker/DatePicker'
import { Box, Button } from '@mui/material'
import { useFormikContext } from 'formik'
import { ReportDateRange } from '@/components/Hr/Finances/FinanceList'
import { t } from 'i18next'

interface DateRangeFormProps {
  onResetForm: (r: string) => void
}

export const DateRangeForm = (props: DateRangeFormProps) => {
  const { isValid, values, resetForm } = useFormikContext<ReportDateRange>()

  return (
    <FormGrid widths={'third'}>
      <DatePicker
        name={'reportStartDate'}
        label={t('common:reportStartDate')}
      />
      <DatePicker
        name={'reportEndDate'}
        label={t('common:reportEndDate')}
      />
      <Box sx={{ pt: 3, gap: 1, display: 'flex', alignItems: 'center' }}>
        <Button
          type={'submit'}
          color={'primary'}
          size={'small'}
          variant={'contained'}
          disabled={!isValid}
        >
          {t('common:apply')}
        </Button>
        {values.reportStartDate && values.reportEndDate && (
          <Button
            type={'button'}
            variant={'outlined'}
            size={'small'}
            onClick={() => {
              resetForm()
              props.onResetForm('')
            }}
          >
            {t('common:clear')}
          </Button>
        )}
      </Box>
    </FormGrid>
  )
}
