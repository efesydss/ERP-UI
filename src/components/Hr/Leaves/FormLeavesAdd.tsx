import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { BaseSelect, OptionType } from '@/components/Common/Form/BaseSelect'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useFormikContext } from 'formik'
import { LeavesBaseProps, LeaveType } from '@/components/Hr/Leaves/typesLeaves'
import { DatePicker } from '@/components/Common/Form/DatePicker/DatePicker'
import { enumToOptions } from '@/utils/transformers'

interface FormLeavesAddProps {
  employees: OptionType[]
}

export const FormLeavesAdd = (props: FormLeavesAddProps) => {
  const { employees } = props
  const { t: common } = useTranslation('common')
  const { values } = useFormikContext<LeavesBaseProps>()

  console.log('values -->', !!values.personnel)

  return (
    <>
      <FormGrid>
        <BaseSelect
          name={'personnel'}
          options={employees}
          nameSpace={'hr'}
        />
        {!!values.personnel && (
          <FormGrid widths={'half'}>
            <DatePicker name={'startTime'} />
            <DatePicker name={'endTime'} />
            <BaseSelect
              name={'timeOffType'}
              options={enumToOptions(LeaveType, 'hr')}
              nameSpace={'hr'}
            />
          </FormGrid>
        )}
      </FormGrid>
      <Button
        type={'submit'}
        color={'primary'}
        variant={'contained'}
      >
        {common('save')}
      </Button>
    </>
  )
}
