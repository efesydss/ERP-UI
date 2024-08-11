import { Accordion, AccordionDetails, AccordionSummary, Box, Button, IconButton } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { FieldArray } from 'formik'
import { DynamicFieldsWrapper } from '@/components/Hr/TimeKeeping/stylesTimeKeeping'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { DynamicFields } from '@/components/Common/Form/Input/DynamicFields'
import { getAccordionConfigs, initializeValues } from '@/components/Hr/TimeKeeping/utilsTimeKeeping'
import { useConfirmDialog } from '@/utils/hooks/useConfirmDialogContext'
import { FaRegTrashCan } from 'react-icons/fa6'
import { MdAdd } from 'react-icons/md'
import { t } from 'i18next'

export const FormTimeKeepingDetails = () => {
  //const data = Route.useLoaderData()
  const accordionConfigs = getAccordionConfigs()
  const { openDialog } = useConfirmDialog()

  return (
    <>
      <Box sx={{ mt: 2 }}>
        {accordionConfigs.map((config, index) => (
          <Accordion
            key={config.name}
            defaultExpanded={index === 0}
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
                  return (
                    <>
                      {arrayHelpers.form.values[config.name]?.map((_: any, index: number) => (
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
                                const fieldValue = arrayHelpers.form.values[config.name][index]
                                if (fieldValue && fieldValue.id) {
                                  openDialog(
                                    'Confirm Deletion',
                                    'Are you sure you want to delete this item?',
                                    () => {
                                      if (config.name === 'overtimes') {
                                        console.log('overtimes')
                                      } else if (config.name === 'additionalPayments' || config.name === 'deductions') {
                                        console.log('additional')
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
                      ))}
                      <FieldArray name={config.name}>
                        {(arrayHelpers) => (
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
                        )}
                      </FieldArray>
                    </>
                  )
                }}
              </FieldArray>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant={'contained'}>guncelle</Button>
      </Box>
    </>
  )
}
