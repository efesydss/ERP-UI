import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { BaseSelect, OptionType } from '@/components/Common/Form/BaseSelect'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useFormikContext } from 'formik'
import { LeavesBaseProps, LeaveType } from '@/components/Hr/Leaves/typesLeaves'
import { DatePicker } from '@/components/Common/Form/DatePicker/DatePicker'
import { enumToOptions } from '@/utils/transformers'
import { Input } from '@/components/Common/Form/Input/Input'
import { Checkbox } from '@/components/Common/Form/Checkbox/Checkbox'

interface FormLeavesAddProps {
  employees: OptionType[]
}

export const FormLeavesAdd = (props: FormLeavesAddProps) => {
  const { employees } = props
  const { t: common } = useTranslation('common')
  const { values } = useFormikContext<LeavesBaseProps>()

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
            <FormGrid widths={'half'}>
              <BaseSelect
                name={'timeOffType'}
                options={enumToOptions(LeaveType, 'hr')}
                nameSpace={'hr'}
              />
              <Checkbox
                name={'unPaid'}
                label={'Ucretsiz'}
              />
            </FormGrid>

            <FormGrid widths={'half'}>
              <Input
                name={'workingDays'}
                type={'number'}
              />
              <Input
                name={'workingHours'}
                type={'number'}
              />
            </FormGrid>
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
