import { TabPanel } from '@/components/Common/Tabs/TabPanel'
import { Box, Button, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { Input } from '@/components/Common/Form/Input/Input'
import { BaseSelect } from '@/components/Common/Form/BaseSelect'
import { DatePicker } from '@/components/Common/Form/DatePicker/DatePicker'
import { FaAngleRight, FaCheck } from 'react-icons/fa6'
import { t } from 'i18next'
import { useState } from 'react'
import { Currency } from '@/components/Hr/Employees/typesEmployee'
import { enumToOptions } from '@/utils/transformers'

interface FormEmployeeProps {
  employeeId?: number
}

export const FormEmployee = (props: FormEmployeeProps) => {
  const isDetailPage = !!props.employeeId

  const { t: hr } = useTranslation('hr')
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <>
      <TabPanel
        activeTab={activeTab}
        onTabChange={handleTabChange}
        tabs={[
          {
            label: hr('infoGeneral'),
            content: (
              <Paper sx={{ p: 2 }}>
                <FormGrid
                  widths={'half'}
                  isContainer
                >
                  <FormGrid>
                    <Input name={'name'} />
                    <Input name={'surname'} />
                    <FormGrid>
                      <BaseSelect
                        name='companyBranch'
                        endpoint={'branches'}
                      />
                      <BaseSelect
                        name='department'
                        endpoint={'departments'}
                      />
                      <Input name={'profession'} />
                      <Input name={'email'} />
                      <DatePicker name={'startDate'} />
                    </FormGrid>
                  </FormGrid>
                  <FormGrid>
                    <Input
                      name={'phone'}
                      isOptional
                    />
                    <Input
                      name={'city'}
                      nameSpace={'hr'}
                      isOptional
                    />
                    <Input
                      name={'province'}
                      isOptional
                    />
                    <Input
                      name={'state'}
                      isOptional
                    />
                    <Input
                      name={'street'}
                      nameSpace={'hr'}
                      isOptional
                    />
                    <Input
                      name={'emergencyPhone'}
                      isOptional
                    />
                    <Input
                      name={'emergencyName'}
                      isOptional
                    />
                  </FormGrid>
                </FormGrid>
                {!isDetailPage && (
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                    <Button
                      size={'small'}
                      endIcon={<FaAngleRight />}
                      type={'button'}
                      color={'primary'}
                      variant={'outlined'}
                      onClick={() => setActiveTab(1)}
                    >
                      {t('common:continue')}
                    </Button>
                  </Box>
                )}
              </Paper>
            )
          },
          {
            label: hr('infoIdentity'),
            content: (
              <Paper sx={{ p: 2 }}>
                <FormGrid widths={'half'}>
                  <Input
                    name={'identificationNumber'}
                    type={'number'}
                  />
                  <Input
                    name={'fathersName'}
                    isOptional
                  />
                  <Input
                    name={'mothersName'}
                    isOptional
                  />
                  <DatePicker
                    name={'birthDate'}
                    isOptional
                  />
                </FormGrid>
                {!isDetailPage && (
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                    <Button
                      size={'small'}
                      endIcon={<FaAngleRight />}
                      type={'button'}
                      color={'primary'}
                      variant={'outlined'}
                      onClick={() => setActiveTab(2)}
                    >
                      {t('common:continue')}
                    </Button>
                  </Box>
                )}
              </Paper>
            )
          },
          {
            label: hr('infoPayroll'),
            content: (
              <Paper sx={{ p: 2 }}>
                <FormGrid widths={'third'}>
                  <Input
                    name={'payrollData.salary'}
                    type={'number'}
                  />
                  <Input name={'payrollData.iban'} />
                  <BaseSelect
                    name={'payrollData.currency'}
                    isEnum
                    options={enumToOptions(Currency)}
                  />
                </FormGrid>
                {!isDetailPage && (
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                    <Button
                      size={'small'}
                      endIcon={<FaCheck />}
                      type={'submit'}
                      color={'primary'}
                      variant={'contained'}
                      onClick={() => setActiveTab(2)}
                    >
                      {t('common:save')}
                    </Button>
                  </Box>
                )}
              </Paper>
            )
          }
        ]}
      />
      {isDetailPage && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            size={'small'}
            endIcon={<FaCheck />}
            type={'submit'}
            color={'primary'}
            variant={'contained'}
          >
            {t('common:save')}
          </Button>
        </Box>
      )}
    </>
  )
}
