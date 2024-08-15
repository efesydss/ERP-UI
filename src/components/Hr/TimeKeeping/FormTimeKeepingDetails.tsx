import { Box, Button } from '@mui/material'
import { useFormikContext } from 'formik'
import { EmployeeTimeKeepingProps } from '@/components/Hr/TimeKeeping/typesTimeKeeping'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'
import { DynamicFieldsAccordion } from '@/components/Hr/TimeKeeping/components/DynamicFieldsAccordion'
import { useEffect } from 'react'
import { useTrackChanges } from '@/components/Hr/TimeKeeping/useTrackChanges'
import { t } from 'i18next'
import { toast } from 'react-toastify'

interface FormTimeKeepingDetailsProps {
  onSetTotalPayment: (total: number) => void
}

export const FormTimeKeepingDetails = (props: FormTimeKeepingDetailsProps) => {
  const { onSetTotalPayment } = props
  const { values } = useFormikContext<EmployeeTimeKeepingProps>()
  const { updatedValues, hasChanges } = useTrackChanges(values)
  const queryClient = useQueryClient()

  const { mutateAsync: updateNetPayment } = useMutation({
    mutationFn: (payment: EmployeeTimeKeepingProps) =>
      apiRequest<{ total: number }, EmployeeTimeKeepingProps>({
        endpoint: 'timeKeepingCalculateTotal',
        payload: payment
      }),
    onSuccess: (res) => {
      onSetTotalPayment(res.total)
    }
  })

  const { mutate: deleteOvertime } = useMutation({
    mutationFn: (id: number) =>
      apiRequest({
        endpoint: 'employeeDeleteOvertime',
        method: 'DELETE',
        params: { employeeId: values.employee.id.toString(), overtimeId: id.toString() }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeKeeping'], refetchType: 'all' })
      toast.success('Entry Deleted')
    }
  })

  useEffect(() => {
    if (!hasChanges) {
      return
    }

    const handler = setTimeout(() => {
      updateNetPayment(updatedValues)
    }, 400)

    return () => {
      clearTimeout(handler)
    }
  }, [hasChanges, updateNetPayment, updatedValues])

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <DynamicFieldsAccordion
          deleteEmployeePayment={() => {}}
          deleteOvertime={deleteOvertime}
        />
      </Box>
      {/*<Box sx={{ mt: 2 }}>
        {accordionConfigs.map((config, index) => (
          <Accordion
            key={config.name}
            defaultExpanded={index === 0}
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
      </Box>*/}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant={'contained'}>{t('common:update')}</Button>
      </Box>
    </>
  )
}
