import { format, Locale } from 'date-fns'
import { t } from 'i18next'
import { tr } from 'date-fns/locale'

type EnumToOptions<T> = Array<{ value: T[keyof T]; label: string }>

export const enumToOptions = <T extends object>(enumObj: T, namespace: string = 'common'): EnumToOptions<T> => {
  return Object.entries(enumObj).map(([key, value]) => ({
    value,
    label: t(`${namespace}:${key}`)
  }))
}

export const formatDate = (date: Date, locale: Locale = tr): string => {
  const day = format(date, 'd', { locale })
  const month = format(date, 'MMMM', { locale })
  const dayOfWeek = format(date, 'EEEE', { locale })
  const year = format(date, 'yyyy', { locale })
  const time = format(date, 'h:mm aa', { locale })

  return `${day} ${month} ${dayOfWeek}, ${year}, ${time}`
}
