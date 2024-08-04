import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { BaseSelect, OptionType } from '@/components/Common/Form/BaseSelect'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useFormikContext } from 'formik'
import { VacationBaseProps, VacationType } from '@/components/Hr/Vacations/typeVacations'
import { DatePicker } from '@/components/Common/Form/DatePicker/DatePicker'
import { enumToOptions } from '@/utils/transformers'
import { Input } from '@/components/Common/Form/Input/Input'
import { Checkbox } from '@/components/Common/Form/Checkbox/Checkbox'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'
import { EmployeeResponse } from '@/components/Hr/Employees/typesEmployee'
import { useQuery } from '@tanstack/react-query'

export const FormVacationAdd = () => {
  const { t: common } = useTranslation('common')
  const { values } = useFormikContext<VacationBaseProps>()

  const { data } = useQuery({
    queryKey: ['employees'],
    queryFn: () =>
      apiRequest<ApiResponse<EmployeeResponse>>({
        endpoint: 'employees',
        payload: {
          filter: '',
          page: 0,
          pageSize: 200
        }
      }),
    select: (res): OptionType[] => {
      return res.data.map((r) => {
        return {
          value: r.id ?? 0,
          label: `${r.name} ${r.surname}`
        }
      })
    }
  })

  return (
    <>
      <FormGrid>
        <BaseSelect
          name={'personnel'}
          options={data}
          nameSpace={'hr'}
        />
        {!!values.personnel.id && (
          <FormGrid widths={'half'}>
            <DatePicker
              name={'startTime'}
              isTimeEnabled
            />
            <DatePicker
              name={'endTime'}
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
