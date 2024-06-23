import { Form, Formik, FormikValues } from 'formik'
import { ReactNode } from 'react'
import { ObjectSchema } from 'yup'

interface BaseFormProps<T extends FormikValues> {
  initialValues: T
  onSubmit: (values: T) => void
  validationSchema?: ObjectSchema<T>
  component: ReactNode
}

export const BaseForm = <T extends FormikValues>(props: BaseFormProps<T>) => {
  const { initialValues, onSubmit, validationSchema, component } = props

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnBlur={false}
    >
      <Form>{component}</Form>
    </Formik>
  )
}
