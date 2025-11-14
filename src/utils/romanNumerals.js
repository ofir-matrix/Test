/**
 * Maximum value that can be represented in Roman numerals
 */
export const MAX_ROMAN_VALUE = 3999;

/**
 * Minimum value that can be represented in Roman numerals
 */
export const MIN_ROMAN_VALUE = 1;

/**
 * Roman numeral symbols and their values
 */
const ROMAN_VALUES = [
  { value: 1000, symbol: 'M' },
  { value: 900, symbol: 'CM' },
  { value: 500, symbol: 'D' },
  { value: 400, symbol: 'CD' },
  { value: 100, symbol: 'C' },
  { value: 90, symbol: 'XC' },
  { value: 50, symbol: 'L' },
  { value: 40, symbol: 'XL' },
  { value: 10, symbol: 'X' },
  { value: 9, symbol: 'IX' },
  { value: 5, symbol: 'V' },
  { value: 4, symbol: 'IV' },
  { value: 1, symbol: 'I' },
];

/**
 * Converts an integer to Roman numeral string
 * @param {number} num - The number to convert (must be between 1 and 3999)
 * @returns {string} Roman numeral representation
 */
export function toRoman(num) {
  if (num === 0) return 'NULLA';
  if (num < 0) return '-' + toRoman(-num);
  if (num > MAX_ROMAN_VALUE) return 'ERROR: TOO LARGE';
  
  let result = '';
  let remaining = Math.floor(num);
  
  for (const { value, symbol } of ROMAN_VALUES) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  
  return result;
}

/**
 * Converts a Roman numeral string to an integer
 * @param {string} roman - The Roman numeral string to convert
 * @returns {number} Integer representation
 */
export function fromRoman(roman) {
  if (!roman || roman === 'NULLA') return 0;
  
  // Handle negative numbers
  if (roman.startsWith('-')) {
    return -fromRoman(roman.slice(1));
  }
  
  const romanToValue = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000,
  };
  
  let result = 0;
  let prevValue = 0;
  
  for (let i = roman.length - 1; i >= 0; i--) {
    const currentValue = romanToValue[roman[i]];
    
    if (currentValue === undefined) {
      return NaN;
    }
    
    if (currentValue < prevValue) {
      result -= currentValue;
    } else {
      result += currentValue;
    }
    
    prevValue = currentValue;
  }
  
  return result;
}

/**
 * Validates if a string is a valid Roman numeral
 * @param {string} roman - The string to validate
 * @returns {boolean} True if valid Roman numeral
 */
export function isValidRoman(roman) {
  if (!roman) return false;
  const pattern = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
  return pattern.test(roman);
}
