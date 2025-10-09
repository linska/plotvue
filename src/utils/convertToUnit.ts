const isDigits = (s: string): boolean => /^[0-9]+$/.test(s)

const getUnit = (value: string | number | undefined): string | undefined => {
  if (!value) return undefined
  if (typeof value == 'number') return `${value}px`
  if (isDigits(value)) return `${value}px`
  return value
}

export {isDigits, getUnit}