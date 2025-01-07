import { useTranslation } from 'react-i18next'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { Input } from '@/components/Common/Form/Input/Input'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Paper, Typography } from '@mui/material'
import { FaCheck } from 'react-icons/fa6'
import { BaseSelect } from '@/components/Common/Form/Select/BaseSelect'
import { SectorEnum } from '@/components/Purchasing/CurrentAccount/types/typesCurrentAccount'
import { Checkbox } from '@/components/Common/Form/Checkbox/Checkbox'
import {
  CurrentAccountType,
  Currency
} from '@/components/Purchasing/CurrentAccount/types/typesCurrentContactInformation'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

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

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <FormGrid
          widths={'half'}
          isContainer
        >
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
          />

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{t('common:ContactInformation')}</Typography>
            </AccordionSummary>
            <AccordionDetails>

              <Input name={'contactInformation.authorizedPerson'} label={t('common:authorizedPerson')} />
              <Input name={'contactInformation.address'} label={t('common:address')} />
              <Input name={'contactInformation.faxNo'} label={t('common:faxNo')} />
              <Input name={'contactInformation.webAddress'} label={t('common:webAddress')} />
              <Input name={'contactInformation.email'} label={t('common:email')} />
              <Input name={'contactInformation.specialCode'} label={t('common:specialCode')} />
              <Input name={'contactInformation.number'} label={t('common:number')} />
              <Input name={'contactInformation.backupNumber'} label={t('common:backupNumber')} />
              <Input name={'contactInformation.taxAdmin'} label={t('common:taxAdmin')} />
              <Input name={'contactInformation.taxNo'} label={t('common:taxNo')} />
              <Checkbox name={'contactInformation.invoicedWithCurrency'}
                        label={'Fatura Para Birimiyle İşlem Yapılsın mı?'} />
              <BaseSelect name={'contactInformation.currency'} isEnum={true} options={currencyOptions}
                         />
              <BaseSelect name={'contactInformation.accountType'} isEnum={true} options={typeOptions}
                          />

            </AccordionDetails>
          </Accordion>


          <BaseSelect
            name="bankAccount"
            fieldName={'iban'}
            endpoint="bankAccounts"
          />

          <BaseSelect
            name="selectedAccounts" // Formik için kullanılacak alan adı
            fieldName="accountNumber" // `label` için kullanılacak `fieldKey`
            endpoint="currentAccountBankAccounts" // Veri kaynağı
            isMulti={true} // Çoklu seçim özelliğini aktif hale getirir
            selectLabel="Hesap Numaraları" // Etiket
            placeholder="Hesap numaralarını seçin"
            isOptional={true} // Zorunlu alan olmadığını belirtir
          />
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