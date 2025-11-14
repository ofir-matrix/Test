import React, { useState } from 'react'
import './Calculator.css'

/**
 * Calculator component that performs operations using ROMI units
 * @returns {JSX.Element} Calculator component
 */
function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  /**
   * Formats a number value to display with ROMI unit
   * @param {number} value - The numeric value to format
   * @returns {string} Formatted string with ROMI unit
   */
  const formatROMI = (value) => {
    if (value === null || value === undefined) return '0 ROMI'
    const numValue = typeof value === 'string' ? parseFloat(value) : value
    if (isNaN(numValue)) return '0 ROMI'
    return `${numValue} ROMI`
  }

  /**
   * Extracts numeric value from ROMI string
   * @param {string} romiString - String like "5 ROMI" or "5"
   * @returns {number} Numeric value
   */
  const parseROMI = (romiString) => {
    if (typeof romiString === 'number') return romiString
    const match = romiString.toString().match(/[\d.]+/)
    return match ? parseFloat(match[0]) : 0
  }

  /**
   * Handles number input
   * @param {string} num - The number string to input
   */
  const handleNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(num)
      setWaitingForNewValue(false)
    } else {
      const currentValue = parseROMI(display)
      const newValue = currentValue === 0 ? num : `${currentValue}${num}`
      setDisplay(newValue)
    }
  }

  /**
   * Handles operation selection
   * @param {string} nextOperation - The operation to perform (+, -, *, /)
   */
  const handleOperation = (nextOperation) => {
    const inputValue = parseROMI(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForNewValue(true)
    setOperation(nextOperation)
  }

  /**
   * Performs calculation between two values
   * @param {number} firstValue - First operand
   * @param {number} secondValue - Second operand
   * @param {string} operation - Operation to perform
   * @returns {number} Result of the calculation
   */
  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        return secondValue !== 0 ? firstValue / secondValue : 0
      default:
        return secondValue
    }
  }

  /**
   * Handles equals button press
   */
  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const inputValue = parseROMI(display)
      const newValue = calculate(previousValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  /**
   * Handles clear button
   */
  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  /**
   * Handles decimal point input
   */
  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.')
      setWaitingForNewValue(false)
    } else if (!display.toString().includes('.')) {
      setDisplay(`${display}.`)
    }
  }

  return (
    <div className="calculator">
      <div className="calculator-display">
        <div className="display-value">{formatROMI(display)}</div>
        {operation && previousValue !== null && (
          <div className="display-operation">
            {formatROMI(previousValue)} {operation}
          </div>
        )}
      </div>
      <div className="calculator-buttons">
        <button className="button button-clear" onClick={handleClear}>
          C
        </button>
        <button className="button button-operator" onClick={() => handleOperation('/')}>
          ÷
        </button>
        <button className="button button-operator" onClick={() => handleOperation('*')}>
          ×
        </button>
        <button className="button button-operator" onClick={() => handleOperation('-')}>
          −
        </button>

        <button className="button button-number" onClick={() => handleNumber('7')}>
          7
        </button>
        <button className="button button-number" onClick={() => handleNumber('8')}>
          8
        </button>
        <button className="button button-number" onClick={() => handleNumber('9')}>
          9
        </button>
        <button className="button button-operator button-plus" onClick={() => handleOperation('+')}>
          +
        </button>

        <button className="button button-number" onClick={() => handleNumber('4')}>
          4
        </button>
        <button className="button button-number" onClick={() => handleNumber('5')}>
          5
        </button>
        <button className="button button-number" onClick={() => handleNumber('6')}>
          6
        </button>
        <button className="button button-equals" onClick={handleEquals}>
          =
        </button>

        <button className="button button-number" onClick={() => handleNumber('1')}>
          1
        </button>
        <button className="button button-number" onClick={() => handleNumber('2')}>
          2
        </button>
        <button className="button button-number" onClick={() => handleNumber('3')}>
          3
        </button>
        <button className="button button-number button-zero" onClick={() => handleNumber('0')}>
          0
        </button>

        <button className="button button-number" onClick={handleDecimal}>
          .
        </button>
      </div>
    </div>
  )
}

export default Calculator
