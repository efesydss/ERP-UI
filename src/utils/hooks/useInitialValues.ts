import * as yup from 'yup'
import { useMemo } from 'react'

function generateInitialValues<T extends yup.AnyObjectSchema>(schema: T): Partial<yup.InferType<T>> {
  const initialValues: Partial<yup.InferType<T>> = {}

  Object.entries(schema.fields).forEach(([key, field]) => {
    const fieldDescription = field.describe()

    switch (fieldDescription.type) {
      case 'object':
        initialValues[key as keyof yup.InferType<T>] = generateInitialValues(field as yup.AnyObjectSchema) as any
        break
      case 'array':
        initialValues[key as keyof yup.InferType<T>] = []
        break
      case 'string':
        initialValues[key as keyof yup.InferType<T>] = ''
        break
      case 'number':
        initialValues[key as keyof yup.InferType<T>] = 0
        break
      case 'boolean':
        initialValues[key as keyof yup.InferType<T>] = false
        break
      case 'date':
        initialValues[key as keyof yup.InferType<T>] = null
        break
      default:
        initialValues[key as keyof yup.InferType<T>] = null
        break
    }

    if ('oneOf' in fieldDescription && Array.isArray(fieldDescription.oneOf) && fieldDescription.oneOf.length > 0) {
      initialValues[key as keyof yup.InferType<T>] = fieldDescription.oneOf[0] as any
    }

    if ((field as yup.MixedSchema).isValidSync(null)) {
      initialValues[key as keyof yup.InferType<T>] = null
    }
  })

  return initialValues
}

export const useInitialValues = <T extends yup.AnyObjectSchema>(schema: T) => {
  return useMemo(() => generateInitialValues(schema), [schema])
}
