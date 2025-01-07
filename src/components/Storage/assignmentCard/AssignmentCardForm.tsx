import { useTranslation } from 'react-i18next'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { Input } from '@/components/Common/Form/Input/Input'
import { BaseSelect } from '@/components/Common/Form/Select/BaseSelect'
import { Box, Button, Paper } from '@mui/material'
import { FaCheck } from 'react-icons/fa6'
import {
  WarrantyPeriodEnum,
  MaintenancePeriodEnum,
  AssignmentStatusEnum
} from '@/components/Storage/assignmentCard/types/typesAssignmentCard'

interface FormAssignmentCardProps {
  assignmentCardId?: number

}

const assignmentStatusOptions = Object.values(AssignmentStatusEnum).map((value) => ({
  label: value,
  value: value
}))


const warrantyPeriodOptions = Object.values(WarrantyPeriodEnum).map((value) => ({
  label: value,
  value: value
}))

const maintenancePeriodEnum = Object.values(MaintenancePeriodEnum).map((value) => ({
  label: value,
  value: value
}))

export const AssignmentCardForm = (props: FormAssignmentCardProps) => {
  const { t } = useTranslation()
  console.log(props)

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <FormGrid
          widths={'half'}
          isContainer
        >
          <FormGrid>
            <BaseSelect
              name={'assignmentStatusEnum'}
              options={assignmentStatusOptions}
              selectLabel={'Assignment Status'}
            />
            <Input name={'code'} />
            <Input name={'name'} />
          </FormGrid>
          <FormGrid>
            <BaseSelect
              name="fixtureCard"
              fieldName={'fixtureName'}
              endpoint="fixtureCards"
            />
            <Input name={'insuranceCompany'} />
            <Input name={'insurance'} />
          </FormGrid>
          <FormGrid>
            <Input name={'insurancePolicyNo'} />
            <Input name={'insuranceDuration'} />
            <Input name={'info'} />
          </FormGrid>
          <FormGrid>
            <BaseSelect
              name="invoice"
              fieldName={'code'}
              endpoint="invoices"
            />
            <BaseSelect
              name={'warrantyPeriodEnum'}
              options={warrantyPeriodOptions}
              selectLabel={'Warranty Period'}
            />
            <Input name={'warrantyDay'} />
          </FormGrid>
          <FormGrid>
            <Input name={'underMaintenance'} label={'underMaintenanceBOOL'} />
            <Input name={'maintenanceDuration'} />
            <BaseSelect
              name={'maintenancePeriodEnum'}
              options={maintenancePeriodEnum}
              selectLabel={'Maintenance Period'}
            />
          </FormGrid>

        </FormGrid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>

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

      </Paper>
    </>

  )
}