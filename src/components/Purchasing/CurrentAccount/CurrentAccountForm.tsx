import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { Input } from '@/components/Common/Form/Input/Input'
import { Box, Button, Paper } from '@mui/material'
import { FaCheck } from 'react-icons/fa6'
import { BaseSelect } from '@/components/Common/Form/Select/BaseSelect'
import { SectorEnum } from '@/components/Purchasing/CurrentAccount/types/typesCurrentAccount'
import { Checkbox } from '@/components/Common/Form/Checkbox/Checkbox'
import {
  CurrentAccountType,
  Currency
} from '@/components/Purchasing/CurrentAccount/types/typesCurrentContactInformation'
import { FaPlus } from 'react-icons/fa'

const assignmentStatusOptions = Object.values(SectorEnum).map((value) => ({
  label: value,
  value: value
}))
const currencyOptions = Object.values(Currency).map((value) => ({
  label: value,
  value: value
}))
const typeOptions = Object.values(CurrentAccountType).map((value) => ({
  label: value,
  value: value
}))

interface FormCurrentAccountProps {
  currentAccountId?: number
}


export const CurrentAccountForm = (props: FormCurrentAccountProps) => {
  console.log(props)
  const { t } = useTranslation()

  const [showForm, setShowForm] = useState(false)
  return (
    <>

      <Paper sx={{ p: 2 }}>
        <FormGrid
          widths={'half'}
          isContainer
        >
          <FormGrid>
            <Input
              name={'code'}
              label={t('common:code')}

            />
            <Input
              name={'title'}
              label={t('common:title')}

            />
            <Checkbox
              name={'active'}
              label={t('common:active')}

            />
            <BaseSelect
              name={'sector'}
              isEnum={true}
              options={assignmentStatusOptions}
              selectLabel={'Sector'}
            />

            <FormGrid
              widths={'half'}
              isContainer>

              <Input name={'contactInformation.address'}
                     label={t('common:address')}
              />

              <Input name={'contactInformation.authorizedPerson'}
                     label={t('common:authorizedPerson')}
              />
              <Input name={'contactInformation.faxNo'}
                     label={t('common:faxNo')}
              />
              <Input name={'contactInformation.webAddress'}
                     label={t('common:webAddress')}
              />
              <Input name={'contactInformation.email'}
                     label={t('common:email')}
              />
              <Input name={'contactInformation.specialCode'}
                     label={t('common:specialCode')}
              />
              <Input name={'contactInformation.number'}
                     label={t('common:number')}
              />
              <Input name={'contactInformation.backupNumber'}
                     label={t('common:backupNumber')}
              />
              <Input name={'contactInformation.taxAdmin'}
                     label={t('common:taxAdmin')}
              />
              <Input name={'contactInformation.taxNo'}
                     label={t('common:taxNo')}
              />
              <Checkbox name={'contactInformation.invoicedWithCurrency'}
                        label={'Fatura Para Birimiyle İşlem Yapılsın mı?'} />
              <BaseSelect
                name={'contactInformation.currency'}
                isEnum={true}
                options={currencyOptions}
                selectLabel={'Currency'}
              />
              <BaseSelect
                name={'contactInformation.accountType'}
                isEnum={true}
                options={typeOptions}
                selectLabel={'Account Type'} />


            </FormGrid>
            <BaseSelect
              name="bankAccount"
              endpoint="bankAccounts"
            />
            <BaseSelect
              isMulti={true}
              name="currentAccountBankAccount"
              endpoint="currentAccountBankAccounts"
            />

            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => setShowForm(true)}
              sx={{ ml: 2 }}
              startIcon={<FaPlus />}
            >
              {t('common:addNewBank')}
            </Button>

            {showForm && (
              <Paper sx={{ p: 2, mt: 2, backgroundColor: 'background.paper', boxShadow: 3 }}>
                <FormGrid widths="half" isContainer>
                  <Input
                    name="newCurrentAccountBankAccount.bankName"
                    label={t('common:newBank')}
                    fullWidth
                    margin="dense"
                  />
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setShowForm(false)
                    }}
                    startIcon={<FaCheck />}
                    sx={{ mt: 2 }}
                  >
                    {t('common:save')}
                  </Button>
                </FormGrid>
              </Paper>
            )}

          </FormGrid>

        </FormGrid>

      </Paper>
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


    </>
  )
}