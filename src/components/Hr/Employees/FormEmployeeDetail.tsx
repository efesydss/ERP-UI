import { Button } from '@mui/material'
import { Input } from '@/components/Common/Form/Input/Input'
import { useTranslation } from 'react-i18next'
import { BaseSelect } from '@/components/Common/Form/BaseSelect'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { DatePicker } from '@/components/Common/Form/DatePicker/DatePicker'
import { EmployeeVacations } from '@/components/Hr/Employees/EmployeeVacations'
import { TabPanel } from '@/components/Common/Tabs/TabPanel'

export const FormEmployeeDetail = () => {
  const { t: common } = useTranslation('common')
  const { t: hr } = useTranslation('hr')

  return (
    <>
      <TabPanel
        tabs={[
          {
            label: hr('infoGeneral'),
            content: (
              <FormGrid widths={'half'}>
                <FormGrid>
                  <Input name={'name'} />
                  <Input name={'surname'} />
                  <Input name={'identificationNumber'} />
                  <Input name={'email'} />
                  <Input name={'profession'} />
                  <BaseSelect
                    name='companyBranch'
                    endpoint={'branches'}
                  />
                  <BaseSelect
                    endpoint={'departments'}
                    name='department'
                  />
                  <DatePicker name={'startDate'} />
                  <DatePicker name={'endDate'} />
                </FormGrid>
                <FormGrid>
                  <Input name={'phone'} />
                  <Input
                    name={'address'}
                    isMultiLine
                  />
                </FormGrid>
              </FormGrid>
            )
          },
          {
            label: hr('infoIdentity'),
            content: (
              <FormGrid widths={'half'}>
                <Input name={'volumeNumber'} />
                <Input name={'familySerial'} />
                <Input name={'birthPlace'} />
                <Input name={'fathersName'} />
                <Input name={'mothersName'} />
                <Input name={'city'} />
                <Input name={'province'} />
                <Input name={'state'} />
                <Input name={'street'} />
                <DatePicker name={'birthDate'} />
              </FormGrid>
            )
          },
          {
            label: hr('infoPayroll'),
            content: <FormGrid widths={'half'}>bordro</FormGrid>
          },
          {
            label: hr('infoTimeOffs'),
            content: <EmployeeVacations />
          }
        ]}
      />
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
