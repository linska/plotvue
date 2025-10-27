export type UnitValue = string | number | undefined

const isDigits = (s: string): boolean => /^[0-9]+$/.test(s)

const getUnit = (value: UnitValue): string | undefined => {
  if (!value) return undefined
  if (typeof value == 'number') return `${value}px`
  if (isDigits(value)) return `${value}px`
  return value
}

export {isDigits, getUnit}