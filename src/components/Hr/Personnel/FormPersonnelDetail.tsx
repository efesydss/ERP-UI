import { Box, Button } from '@mui/material'
import { Input } from '@/components/Common/Form/Input/Input'
import { useTranslation } from 'react-i18next'
import { ReactNode } from 'react'
import { BaseSelect } from '@/components/Common/Form/BaseSelect'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { DatePicker } from '@/components/Common/Form/DatePicker/DatePicker'

interface FormPersonnelDetailProps {
  value: number
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

export const FormPersonnelDetail = (props: FormPersonnelDetailProps) => {
  const { t: common } = useTranslation('common')
  const { value } = props

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]

  return (
    <>
      <CustomTabPanel
        value={value}
        index={0}
      >
        <FormGrid widths={'half'}>
          <Input name={'fullName'} />
          <Input name={'email'} />
          <BaseSelect
            name='title'
            options={options}
          />
          <DatePicker
            name={'startDate'}
            label={'start'}
          />
          <Input
            name={'address'}
            isMultiLine
          />
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
        value={value}
        index={1}
      >
        Item Two
      </CustomTabPanel>
      <CustomTabPanel
        value={value}
        index={2}
      >
        three
      </CustomTabPanel>
    </>
  )
}
