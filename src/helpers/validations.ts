/**
 * Not all valid zip codes exist, but to be a valid zip code, 
 * it should be 5 digits.
 */
export function isValidZipCode(value: string) {
  return value.length === 5 && isDigits(value)
}

/**
 * Is this a possible zip code? This allows the user to type: `981`, 
 * but not `98110088` or `abc11`.
 */
export function isPossibleZipCode(value: string) {
  return value.length === 0 || (value.length <= 5 && isDigits(value))
}

function isDigits(value: string) {
  return /^\d+$/.test(value);
}