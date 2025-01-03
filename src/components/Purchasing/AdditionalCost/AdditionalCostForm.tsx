import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { Input } from '@/components/Common/Form/Input/Input'
import { Box, Button, Paper } from '@mui/material'
import { FaCheck } from 'react-icons/fa6'
import { BaseSelect } from '@/components/Common/Form/Select/BaseSelect'
import { DefaultUnit } from '@/components/Purchasing/AdditionalCost/types/typesAdditionalCost'

interface FormAdditionalCostProps {
  additionalCostId?: number
}

export const AdditionalCostForm = (props: FormAdditionalCostProps) => {
  console.log(props)
  const { t } = useTranslation()
  const warrantyPeriodOptions = Object.values(DefaultUnit).map((value) => ({
    label: value,
    value: value
  }))

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
              required
            />
            <Input
              name={'description'}
              label={t('common:description')}
              required
            />
            <BaseSelect
              name={'unit'}
              isEnum={true}
              options={warrantyPeriodOptions}
              selectLabel={t('common:unit')}
            />
            <Input
              name={'specialCode'}
              label={t('common:specialCode')}
              required
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