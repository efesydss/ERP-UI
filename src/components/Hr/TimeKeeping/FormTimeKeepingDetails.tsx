import { Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material'
import { t } from 'i18next'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Route } from '@/routes/_authenticated/hr/timekeeping/$id'
import { FieldArray } from 'formik'
import { useFormArray } from '@/components/Common/Form/useFormArray'
import { DynamicFieldsWrapper } from '@/components/Hr/TimeKeeping/stylesTimeKeeping'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { DynamicFields } from '@/components/Common/Form/Input/DynamicFields'
import { enumToOptions } from '@/utils/transformers'
import { OverTimePercentage } from '@/components/Hr/TimeKeeping/typesTimeKeeping'

export const FormTimeKeepingDetails = () => {
  const data = Route.useLoaderData()
  const { setCurrentHelpers } = useFormArray<any>()

  console.log('data -->', data)

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1-content'
            id='panel1-header'
          >
            {t('hr:overtimes')}
          </AccordionSummary>
          <AccordionDetails>
            <FieldArray name={'overtimes'}>
              {(arrayHelpers) => {
                setCurrentHelpers(arrayHelpers)
                return (
                  <>
                    {arrayHelpers.form.values['overtimes']?.map((_: any, index: number) => (
                      <DynamicFieldsWrapper key={index}>
                        <Box>
                          <FormGrid widths={'forth'}>
                            <DynamicFields
                              prefix={`overtimes.${index}`}
                              fields={[
                                {
                                  name: 'overTimePercentage',
                                  type: 'select',
                                  options: enumToOptions(OverTimePercentage)
                                },
                                { name: 'overtimeDate', type: 'date' },
                                { name: 'workingHours', type: 'number' }
                              ]}
                            />
                          </FormGrid>
                        </Box>
                      </DynamicFieldsWrapper>
                    ))}
                  </>
                )
              }}
            </FieldArray>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel2-content'
            id='panel2-header'
          >
            {t('hr:deductions')}
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel3-content'
            id='panel3-header'
          >
            {t('hr:additionalPayments')}
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  )
}
