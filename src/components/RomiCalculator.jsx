import React, { useState } from 'react'
import './RomiCalculator.css'

const OPERATIONS = {
  ADD: '+',
  SUBTRACT: '-',
  MULTIPLY: '*',
  DIVIDE: '/',
  EQUALS: '=',
}

const BUTTON_TYPES = {
  NUMBER: 'number',
  OPERATION: 'operation',
  CLEAR: 'clear',
  EQUALS: 'equals',
}

/**
 * ROMI Calculator component
 * Performs calculations using ROMI values instead of numbers
 */
function RomiCalculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  /**
   * Formats a number to display with ROMI suffix
   * @param {number} value - The numeric value to format
   * @returns {string} Formatted string with ROMI suffix
   */
  const formatRomi = (value) => {
    if (value === null || value === undefined) return '0 ROMI'
    const numValue = typeof value === 'string' ? parseFloat(value) : value
    if (isNaN(numValue)) return '0 ROMI'
    return `${numValue} ROMI`
  }

  /**
   * Parses ROMI value from display string
   * @param {string} value - The display string
   * @returns {number} Numeric value
   */
  const parseRomi = (value) => {
    if (typeof value === 'number') return value
    const cleaned = value.toString().replace(/ ROMI/gi, '').trim()
    return parseFloat(cleaned) || 0
  }

  /**
   * Handles number button clicks
   * @param {string} number - The number clicked
   */
  const handleNumber = (number) => {
    if (waitingForNewValue) {
      setDisplay(number)
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? number : display + number)
    }
  }

  /**
   * Performs the calculation based on operation
   * @param {number} prev - Previous value
   * @param {number} current - Current value
   * @param {string} op - Operation symbol
   * @returns {number} Result of calculation
   */
  const performCalculation = (prev, current, op) => {
    switch (op) {
      case OPERATIONS.ADD:
        return prev + current
      case OPERATIONS.SUBTRACT:
        return prev - current
      case OPERATIONS.MULTIPLY:
        return prev * current
      case OPERATIONS.DIVIDE:
        return current !== 0 ? prev / current : 0
      default:
        return current
    }
  }

  /**
   * Handles operation button clicks
   * @param {string} nextOperation - The operation to perform
   */
  const handleOperation = (nextOperation) => {
    const inputValue = parseRomi(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = performCalculation(currentValue, inputValue, operation)
      setDisplay(newValue.toString())
      setPreviousValue(newValue)
    }

    setWaitingForNewValue(true)
    setOperation(nextOperation)
  }

  /**
   * Handles equals button click
   */
  const handleEquals = () => {
    const inputValue = parseRomi(display)

    if (previousValue !== null && operation) {
      const newValue = performCalculation(previousValue, inputValue, operation)
      setDisplay(newValue.toString())
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  /**
   * Handles clear button click
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
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  return (
    <div className="calculator">
      <div className="calculator-display">
        <div className="display-value">{formatRomi(display)}</div>
      </div>
      <div className="calculator-buttons">
        <button
          className="button button-clear"
          onClick={handleClear}
          aria-label="Clear"
        >
          C
        </button>
        <button
          className="button button-operation"
          onClick={() => handleOperation(OPERATIONS.DIVIDE)}
          aria-label="Divide"
        >
          ÷
        </button>
        <button
          className="button button-operation"
          onClick={() => handleOperation(OPERATIONS.MULTIPLY)}
          aria-label="Multiply"
        >
          ×
        </button>
        <button
          className="button button-operation"
          onClick={() => handleOperation(OPERATIONS.SUBTRACT)}
          aria-label="Subtract"
        >
          −
        </button>

        <button
          className="button button-number"
          onClick={() => handleNumber('7')}
          aria-label="Seven"
        >
          7
        </button>
        <button
          className="button button-number"
          onClick={() => handleNumber('8')}
          aria-label="Eight"
        >
          8
        </button>
        <button
          className="button button-number"
          onClick={() => handleNumber('9')}
          aria-label="Nine"
        >
          9
        </button>
        <button
          className="button button-operation"
          onClick={() => handleOperation(OPERATIONS.ADD)}
          aria-label="Add"
        >
          +
        </button>

        <button
          className="button button-number"
          onClick={() => handleNumber('4')}
          aria-label="Four"
        >
          4
        </button>
        <button
          className="button button-number"
          onClick={() => handleNumber('5')}
          aria-label="Five"
        >
          5
        </button>
        <button
          className="button button-number"
          onClick={() => handleNumber('6')}
          aria-label="Six"
        </button>
        <button
          className="button button-equals"
          onClick={handleEquals}
          aria-label="Equals"
          rowSpan="2"
        >
          =
        </button>

        <button
          className="button button-number"
          onClick={() => handleNumber('1')}
          aria-label="One"
        >
          1
        </button>
        <button
          className="button button-number"
          onClick={() => handleNumber('2')}
          aria-label="Two"
        >
          2
        </button>
        <button
          className="button button-number"
          onClick={() => handleNumber('3')}
          aria-label="Three"
        >
          3
        </button>

        <button
          className="button button-number button-zero"
          onClick={() => handleNumber('0')}
          aria-label="Zero"
        >
          0
        </button>
        <button
          className="button button-number"
          onClick={handleDecimal}
          aria-label="Decimal point"
        >
          .
        </button>
      </div>
    </div>
  )
}

export default RomiCalculator
