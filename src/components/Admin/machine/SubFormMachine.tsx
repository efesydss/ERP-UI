import { AccordionDetails, Box } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { t } from 'i18next'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { EmployeeResponse } from '@/components/Hr/Employees/typesEmployee'
import { SyntheticEvent, useState } from 'react'
import { useFormikContext } from 'formik'
import { getEmployeeConfig } from '@/components/Hr/Employees/configEmployee'
import { MdErrorOutline } from 'react-icons/md'
import { Accordion, AccordionSummary } from '@/components/Common/Accordion/stylesAccordion'
import { MachineDynamicFields } from '@/components/Admin/machine/MachineDynamicField'

export const SubFormMachine = () => {
  const [expanded, setExpanded] = useState<string | false>('infoGeneral')

  const handleAccordionChange = (panel: string) => (_: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const { errors } = useFormikContext<EmployeeResponse>()

  const hasErrors = getEmployeeConfig().reduce(
    (acc, section) => {
      acc[section.id] = section.fields.some((field) => !!errors[field.name as keyof EmployeeResponse])
      return acc
    },
    {} as Record<string, boolean>
  )

  return (
    <>
      {getEmployeeConfig().map((config, index) => (
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
              {t(`common:${config.id}`)}
              {hasErrors[config.id] && (
                <Box sx={{ display: 'flex', color: 'error.main' }}>
                  <MdErrorOutline />
                </Box>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <FormGrid widths={'half'}>
              <MachineDynamicFields fields={config.fields} />
            </FormGrid>
          </AccordionDetails>
        </Accordion>
      ))}

    </>
  )
}
