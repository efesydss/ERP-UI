import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { Input } from '@/components/Common/Form/Input/Input'
import { Box, Button, Paper } from '@mui/material'
import { FaCheck } from 'react-icons/fa6'
import { DatePicker } from '@/components/Common/Form/DatePicker/DatePicker'
import { BaseSelect } from '@/components/Common/Form/Select/BaseSelect'
import { Checkbox } from '@/components/Common/Form/Checkbox/Checkbox'
import { WarehouseBranchEnum, InvoiceTypeEnum, Currency } from '@/components/Purchasing/Invoice/types/typesInvoice'

interface FormInvoiceProps {
  invoiceId?: number
}

const warehouseBranchOptions = Object.values(WarehouseBranchEnum).map((value) => ({
  label: value,
  value: value
}))
const invoiceTypeEnumOptions = Object.values(InvoiceTypeEnum).map((value) => ({
  label: value,
  value: value
}))
const currencyOptions = Object.values(Currency).map((value) => ({
  label: value,
  value: value
}))

export const InvoiceForm = (props: FormInvoiceProps) => {
  console.log(props)
  const { t } = useTranslation()

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
              label={t('code')}
              required />
            <DatePicker name={'date'} label={t('date')} />
            <BaseSelect
              name={'warehouseBranch'}
              isEnum={true}
              options={warehouseBranchOptions}
              selectLabel={t('common:warehouseBranch')}
            />
            <Input
              name={'specialCode'}
              label={t('specialCode')}
              required />
            <BaseSelect
              name={'currency'}
              isEnum={true}
              options={currencyOptions}
              selectLabel={t('common:currency')}
            />
            <Checkbox
              name={'fixedCurrency'}
              label={t('common:fixedCurrency')}
            />
            <Input
              name={'fixedCurrencyValue'}
              label={t('common:fixedCurrencyValue')}
              required />
            //todo invoiceItems list select

            <Input
              name={'generalDiscount'}
              label={t('common:generalDiscount')}
            />
            <Input
              name={'unitDiscount'}
              label={t('common:unitDiscount')}
            />
            <Input
              name={'totalVat'}
              label={t('common:totalVat')}
            />
            <Input
              name={'totalAdditionalCosts'}
              label={t('common:totalAdditionalCosts')}
            />

            <Input
              name={'subTotal'}
              label={t('common:subTotal')}
            />

            <Input
              name={'finalTotal'}
              label={t('common:finalTotal')}
            />
            <BaseSelect
              name={'invoiceTypeEnum'}
              isEnum={true}
              options={invoiceTypeEnumOptions}
              selectLabel={t('common:invoiceTypeEnum')}
            />

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