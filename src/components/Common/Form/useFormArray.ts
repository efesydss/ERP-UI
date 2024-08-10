export interface FormikArrayHelpers<T> {
  push: (obj: T) => void
  remove?: (index: number) => void
}

interface FormikArrayHelpersProps<U> {
  addItem: (data: U) => void
  removeItem: (index: number) => void
  setCurrentHelpers: (arrayHelpers: FormikArrayHelpers<U>) => void
}

export const useFormArray = <T>(): FormikArrayHelpersProps<T> => {
  let currentArrayHelpers: FormikArrayHelpers<T> | null = null

  const addItem = (data: T): void => {
    currentArrayHelpers?.push(data)
  }

  const removeItem = (index: number): void => {
    currentArrayHelpers?.remove?.(index)
  }

  const setCurrentHelpers = (arrayHelpers: FormikArrayHelpers<T>): void => {
    currentArrayHelpers = arrayHelpers
  }

  return {
    addItem,
    removeItem,
    setCurrentHelpers
  }
}
