import { Form, Formik, FormikValues } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { ZodSchema } from 'zod'

interface BaseFormProps<T extends FormikValues> {
  initialValues: T
  onSubmit: (values: T) => void
  validationSchema: (t: (key: string) => string) => ZodSchema<T>
  component: ReactNode
}

export const BaseForm = <T extends FormikValues>(props: BaseFormProps<T>) => {
  const { t: feedbacks } = useTranslation('feedbacks')
  const { initialValues, onSubmit, validationSchema, component } = props

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema(validationSchema(feedbacks))}
    >
      <Form>{component}</Form>
    </Formik>
  )
}
