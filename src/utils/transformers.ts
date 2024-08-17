import { format, parseISO } from 'date-fns'
import { t } from 'i18next'
import { tr } from 'date-fns/locale'

type EnumToOptions<T> = Array<{ value: T[keyof T]; label: string }>

export const enumToOptions = <T extends object>(enumObj: T, namespace: string = 'common'): EnumToOptions<T> => {
  return Object.entries(enumObj).map(([key, value]) => ({
    value,
    label: t(`${namespace}:${key}`)
  }))
}

export const formatToDateReadable = (dateString: string, locale = tr): string => {
  const date = parseISO(dateString)
  return format(date, 'dd-MM-yyyy HH:mm', { locale })
}

export const formatToISOString = (dateString: string): string => {
  const date = new Date(dateString.replace(' ', 'T'))
  return date.toISOString()
}

export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const labelParser = (str: string, separator: string): string => {
  const parts = str.split(separator)
  return parts.length > 1 ? parts[parts.length - 1] : str
}
