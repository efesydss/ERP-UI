import { t } from 'i18next'

type EnumToOptions<T> = Array<{ value: T[keyof T]; label: string }>

export const enumToOptions = <T extends object>(enumObj: T, namespace: string = 'common'): EnumToOptions<T> => {
  return Object.entries(enumObj).map(([key, value]) => ({
    value,
    label: t(`${namespace}:${key}`)
  }))
}
