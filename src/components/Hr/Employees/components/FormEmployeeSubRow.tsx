import { Accordion, AccordionDetails, AccordionSummary, Box, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { t } from 'i18next'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { EmployeeResponse } from '@/components/Hr/Employees/typesEmployee'
import { SyntheticEvent, useState } from 'react'
import { useFormikContext } from 'formik'
import { LuRefreshCcw } from 'react-icons/lu'
import { DynamicFields } from '@/components/Common/Form/Input/DynamicFields'
import { employeeConfig } from '@/components/Hr/Employees/configEmployee'
import { MdErrorOutline } from 'react-icons/md'

export const FormEmployeeSubRow = () => {
  const [expanded, setExpanded] = useState<string | false>('infoGeneral')

  const handleAccordionChange = (panel: string) => (_: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const { errors, dirty } = useFormikContext<EmployeeResponse>()
  const isSubmitDisabled = !!Object.keys(errors).length || !dirty

  const hasErrors = employeeConfig.reduce(
    (acc, section) => {
      acc[section.id] = section.fields.some((field) => !!errors[field.name as keyof EmployeeResponse])
      return acc
    },
    {} as Record<string, boolean>
  )

  console.log('hasErrors -->', hasErrors)

  return (
    <>
      {employeeConfig.map((config, index) => (
        <Accordion
          disableGutters
          key={`${config.id}-${index}`}
          id={`${config.id}-header`}
          expanded={expanded === config.id}
          onChange={handleAccordionChange(config.id)}
        >
          <AccordionSummary
            id={`${config.id}-header`}
            expandIcon={<ExpandMoreIcon />}
          >
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {t(`hr:${config.id}`)}
              {hasErrors[config.id] && (
                <Box sx={{ display: 'flex', color: 'error.main' }}>
                  <MdErrorOutline />
                </Box>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <FormGrid widths={'half'}>
              <DynamicFields fields={config.fields} />
            </FormGrid>
          </AccordionDetails>
        </Accordion>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          size={'small'}
          disabled={isSubmitDisabled}
          startIcon={<LuRefreshCcw />}
          type={'submit'}
          color={'primary'}
          variant={'contained'}
        >
          {t('common:update')}
        </Button>
      </Box>
    </>
  )
}
