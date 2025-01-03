import { useTranslation } from 'react-i18next'
import { Box, Button, Paper } from '@mui/material'
import { FaCheck } from 'react-icons/fa6'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { BaseSelect } from '@/components/Common/Form/Select/BaseSelect'
import { Input } from '@/components/Common/Form/Input/Input'
import { AssignmentStatusEnum } from '@/components/Storage/assignmentCard/types/typesAssignmentCard'

interface FormAssignmenttransactionProps {
  assignmentTransactionId?: number

}

const assignmentStatusOptions = Object.values(AssignmentStatusEnum).map((value) => ({
  label: value,
  value: value
}))
export const AssignmentTransactionForm = (props: FormAssignmenttransactionProps) => {
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
              isEnum={true}
              options={assignmentStatusOptions}
              selectLabel={'Assignment Status'}
            />
            <BaseSelect
              name="fixtureCard"
              endpoint="fixtureCards"
            />
            <BaseSelect
              name="employee"
              endpoint="employees"
            />
            <Input name={'transactionDate'} />
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