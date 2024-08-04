export const getCurrentYear = (): number => {
  return new Date().getFullYear()
}

export const getCurrentMonth = (): number => {
  return new Date().getMonth() + 1
}

export const getCurrentDay = (): number => {
  return new Date().getDate()
}
