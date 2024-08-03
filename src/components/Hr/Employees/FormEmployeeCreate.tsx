import { TabPanel } from '@/components/Common/Tabs/TabPanel'
import { Button, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { Input } from '@/components/Common/Form/Input/Input'
import { BaseSelect } from '@/components/Common/Form/BaseSelect'
import { DatePicker } from '@/components/Common/Form/DatePicker/DatePicker'

export const FormEmployeeCreate = () => {
  const { t: common } = useTranslation('common')
  const { t: hr } = useTranslation('hr')
  return (
    <>
      <TabPanel
        tabs={[
          {
            label: hr('infoGeneral'),
            content: (
              <Paper sx={{ p: 2 }}>
                <FormGrid widths={'half'}>
                  <Input name={'name'} />
                  <Input name={'surname'} />

                  <BaseSelect
                    name='companyBranch'
                    endpoint={'branches'}
                  />
                  <BaseSelect
                    name='department'
                    endpoint={'departments'}
                  />
                  <DatePicker name={'startDate'} />
                  <Input name={'profession'} />
                  <Input name={'emergencyPhone'} />
                  <Input name={'emergencyName'} />
                  <Input name={'email'} />
                </FormGrid>
              </Paper>
            )
          },
          {
            label: hr('infoIdentity'),
            content: (
              <FormGrid widths={'half'}>
                <Input name={'identificationNumber'} />
                <Input
                  name={'fathersName'}
                  isOptional
                />
                <Input
                  name={'mothersName'}
                  isOptional
                />
                <DatePicker name={'birthDate'} />
              </FormGrid>
            )
          },
          {
            label: hr('infoPayroll'),
            content: <FormGrid widths={'half'}>here</FormGrid>
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
