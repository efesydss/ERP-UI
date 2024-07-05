import { Box, Button } from '@mui/material'
import { Input } from '@/components/Common/Form/Input/Input'
import { useTranslation } from 'react-i18next'
import { ReactNode } from 'react'
import { BaseSelect } from '@/components/Common/Form/BaseSelect'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { DatePicker } from '@/components/Common/Form/DatePicker/DatePicker'
import { BloodType } from '@/components/Hr/Employee/typesEmployee'

interface FormPersonnelDetailProps {
  value?: number
}

interface TabPanelProps {
  children?: ReactNode
  index: number
  value: number
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export const FormEmployeeDetail = (props: FormPersonnelDetailProps) => {
  const { t: common } = useTranslation('common')
  const { value } = props

  const options = [
    { value: 'software_developer', label: 'Software Developer' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]

  const bloodTypeOptions = Object.values(BloodType).map((type) => ({
    value: type,
    label: type
  }))

  return (
    <>
      <CustomTabPanel
        value={value || 0}
        index={0}
      >
        <FormGrid widths={'half'}>
          <FormGrid>
            <Input name={'name'} />
            <Input name={'surname'} />
            <Input name={'email'} />
            <BaseSelect
              name='profession'
              options={options}
            />
            <DatePicker name={'startDate'} />
            <DatePicker name={'endDate'} />
          </FormGrid>
          <FormGrid>
            <Input name={'homePhone'} />
            <Input name={'mobilePhone'} />
            <BaseSelect
              name='bloodType'
              options={bloodTypeOptions}
            />
            <Input
              name={'address'}
              isMultiLine
            />
          </FormGrid>
        </FormGrid>
        <Button
          type={'submit'}
          color={'primary'}
          variant={'contained'}
        >
          {common('save')}
        </Button>
      </CustomTabPanel>
      <CustomTabPanel
        value={value || 0}
        index={1}
      >
        Item Two
      </CustomTabPanel>
      <CustomTabPanel
        value={value || 0}
        index={2}
      >
        three
      </CustomTabPanel>
    </>
  )
}
