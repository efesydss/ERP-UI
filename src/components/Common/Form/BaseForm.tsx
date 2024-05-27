import { Form, Formik, FormikValues } from 'formik'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { ObjectSchema, setLocale } from 'yup'

interface BaseFormProps<T extends FormikValues> {
  initialValues: T
  onSubmit: (values: T) => void
  validationSchema: ObjectSchema<T>
  component: ReactNode
}

export const BaseForm = <T extends FormikValues>(props: BaseFormProps<T>) => {
  const { t: feedbacks } = useTranslation('feedbacks')
  const { initialValues, onSubmit, validationSchema, component } = props

  setLocale({
    mixed: {
      required: feedbacks('notValid.required')
    },
    string: {
      email: feedbacks('notValid.email')
    }
  })

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>{component}</Form>
    </Formik>
  )
}
