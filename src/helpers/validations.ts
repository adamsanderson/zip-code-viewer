export function isNumber(value: string) {
  return /^\d+$/.test(value);
}

export function isValidZipCode(zipCode: string) {
  return zipCode.length === 5 && isNumber(zipCode)
}