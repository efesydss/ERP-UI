import { useCallback } from 'react'

export const useLocalStorage = (key: string) => {
  const setItem = useCallback(
    (value: unknown) => {
      localStorage.setItem(key, JSON.stringify(value))
    },
    [key]
  )

  const getItem = useCallback(() => {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }, [key])

  return { getItem, setItem }
}
