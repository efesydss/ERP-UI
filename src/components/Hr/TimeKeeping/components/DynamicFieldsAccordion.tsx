import { useConfirmDialog } from '@/utils/hooks/useConfirmDialogContext'
import { useFieldConfigurations } from '@/components/Hr/TimeKeeping/useFieldConfigurations'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, IconButton, Typography } from '@mui/material'
import { t } from 'i18next'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { FieldArray } from 'formik'
import { DynamicFieldsWrapper } from '@/components/Hr/TimeKeeping/stylesTimeKeeping'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { DynamicFields } from '@/components/Common/Form/Input/DynamicFields'
import { FaRegTrashCan } from 'react-icons/fa6'
import { initializeValues } from '@/components/Hr/TimeKeeping/utilsTimeKeeping'
import { MdAdd } from 'react-icons/md'

interface DynamicFieldsAccordionProps {
  deleteOvertime: (id: number) => void
  deleteEmployeePayment: (id: number) => void
}

export const DynamicFieldsAccordion = (props: DynamicFieldsAccordionProps) => {
  const { deleteOvertime, deleteEmployeePayment } = props
  const { openDialog } = useConfirmDialog()
  const fieldConfigurations = useFieldConfigurations()

  const accordionConfigs = [
    {
      name: 'overtimes',
      label: t('common:overtimes'),
      fields: fieldConfigurations['overtimes']
    },
    {
      name: 'deductions',
      label: t('common:deductions'),
      fields: fieldConfigurations['deductions']
    },
    {
      name: 'additionalPayments',
      label: t('common:additionalPayments'),
      fields: fieldConfigurations['additionalPayments']
    }
  ]

  return (
    <>
      {accordionConfigs.map((config, index) => (
        <Accordion
          key={config.name}
          defaultExpanded={index === 0}
          id={`${config.name}-header`}
          disableGutters
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`${config.name}-header`}
          >
            {config.label}
          </AccordionSummary>
          <AccordionDetails>
            <FieldArray name={config.name}>
              {(arrayHelpers) => {
                const items = arrayHelpers.form.values[config.name]
                return (
                  <>
                    {items?.length > 0 ? (
                      items.map((_: any, index: number) => (
                        <DynamicFieldsWrapper key={index}>
                          <Box>
                            <FormGrid widths={'forth'}>
                              <DynamicFields
                                prefix={`${config.name}.${index}`}
                                fields={config.fields}
                              />
                            </FormGrid>
                            <IconButton
                              sx={{ position: 'absolute', right: 6, top: 6 }}
                              size={'small'}
                              onClick={() => {
                                const fieldValue = items[index]
                                if (fieldValue && fieldValue.id) {
                                  openDialog(
                                    'Confirm Deletion',
                                    'Are you sure you want to delete this item?',
                                    () => {
                                      if (config.name === 'overtimes') {
                                        deleteOvertime(fieldValue.id)
                                      } else if (config.name === 'additionalPayments' || config.name === 'deductions') {
                                        deleteEmployeePayment(fieldValue.id)
                                      }
                                    },
                                    () => console.log('Deletion cancelled')
                                  )
                                } else {
                                  arrayHelpers.remove(index)
                                }
                              }}
                              color={'error'}
                            >
                              <FaRegTrashCan />
                            </IconButton>
                          </Box>
                        </DynamicFieldsWrapper>
                      ))
                    ) : (
                      <Typography
                        sx={{ mb: 3 }}
                        color='textSecondary'
                      >
                        {t('common:noRecordsFound')}
                      </Typography>
                    )}
                    <Button
                      size={'small'}
                      variant={'outlined'}
                      onClick={(e) => {
                        e.stopPropagation()
                        arrayHelpers.push(initializeValues(config.fields))
                      }}
                    >
                      <MdAdd /> {t('common:addNewLine')}
                    </Button>
                  </>
                )
              }}
            </FieldArray>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  )
}
