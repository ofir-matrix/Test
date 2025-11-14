import { useState } from 'react';
import { toRoman, fromRoman } from '../utils/romanNumerals';
import './Calculator.css';

/**
 * Operation types for the calculator
 */
const Operations = {
  ADD: '+',
  SUBTRACT: '-',
  MULTIPLY: '×',
  DIVIDE: '÷',
  NONE: null,
};

/**
 * Roman Numeral Calculator Component
 * A calculator that displays and operates with Roman numerals
 */
function Calculator() {
  const [display, setDisplay] = useState('NULLA');
  const [currentValue, setCurrentValue] = useState(0);
  const [previousValue, setPreviousValue] = useState(0);
  const [operation, setOperation] = useState(Operations.NONE);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  /**
   * Handles number input (converts to Roman numeral context)
   * @param {number} digit - The digit to input
   */
  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(toRoman(digit));
      setCurrentValue(digit);
      setWaitingForOperand(false);
    } else {
      const newValue = currentValue * 10 + digit;
      setDisplay(toRoman(newValue));
      setCurrentValue(newValue);
    }
  };

  /**
   * Handles Roman symbol direct input
   * @param {string} symbol - The Roman symbol (I, V, X, L, C, D, M)
   */
  const inputRomanSymbol = (symbol) => {
    if (waitingForOperand) {
      setDisplay(symbol);
      setCurrentValue(fromRoman(symbol));
      setWaitingForOperand(false);
    } else {
      const newRoman = display === 'NULLA' ? symbol : display + symbol;
      const newValue = fromRoman(newRoman);
      
      if (!isNaN(newValue) && newValue <= 3999) {
        setDisplay(newRoman);
        setCurrentValue(newValue);
      }
    }
  };

  /**
   * Clears all calculator state
   */
  const clearAll = () => {
    setDisplay('NULLA');
    setCurrentValue(0);
    setPreviousValue(0);
    setOperation(Operations.NONE);
    setWaitingForOperand(false);
  };

  /**
   * Handles operation button press
   * @param {string} nextOperation - The operation to perform
   */
  const performOperation = (nextOperation) => {
    if (operation !== Operations.NONE && !waitingForOperand) {
      calculate();
    } else {
      setPreviousValue(currentValue);
    }
    
    setOperation(nextOperation);
    setWaitingForOperand(true);
  };

  /**
   * Calculates the result based on the current operation
   */
  const calculate = () => {
    let result = 0;
    
    switch (operation) {
      case Operations.ADD:
        result = previousValue + currentValue;
        break;
      case Operations.SUBTRACT:
        result = previousValue - currentValue;
        break;
      case Operations.MULTIPLY:
        result = previousValue * currentValue;
        break;
      case Operations.DIVIDE:
        if (currentValue === 0) {
          setDisplay('ERROR: DIV/0');
          setCurrentValue(0);
          setPreviousValue(0);
          setOperation(Operations.NONE);
          setWaitingForOperand(false);
          return;
        }
        result = Math.floor(previousValue / currentValue);
        break;
      default:
        return;
    }
    
    setDisplay(toRoman(result));
    setCurrentValue(result);
    setPreviousValue(0);
    setOperation(Operations.NONE);
    setWaitingForOperand(true);
  };

  /**
   * Toggles the sign of the current value
   */
  const toggleSign = () => {
    const newValue = -currentValue;
    setDisplay(toRoman(newValue));
    setCurrentValue(newValue);
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="calculator-header">
          <h1>ROMI Calculator</h1>
          <p className="subtitle">Roman Numeral Calculator</p>
        </div>
        
        <div className="display">
          <div className="display-value">{display}</div>
          <div className="display-decimal">{currentValue}</div>
        </div>

        <div className="button-grid">
          <button className="btn btn-function" onClick={clearAll}>AC</button>
          <button className="btn btn-function" onClick={toggleSign}>+/-</button>
          <button className="btn btn-operation" onClick={() => performOperation(Operations.DIVIDE)}>÷</button>
          
          <button className="btn btn-roman" onClick={() => inputRomanSymbol('M')}>M</button>
          <button className="btn btn-roman" onClick={() => inputRomanSymbol('D')}>D</button>
          <button className="btn btn-roman" onClick={() => inputRomanSymbol('C')}>C</button>
          <button className="btn btn-operation" onClick={() => performOperation(Operations.MULTIPLY)}>×</button>
          
          <button className="btn btn-roman" onClick={() => inputRomanSymbol('L')}>L</button>
          <button className="btn btn-roman" onClick={() => inputRomanSymbol('X')}>X</button>
          <button className="btn btn-roman" onClick={() => inputRomanSymbol('V')}>V</button>
          <button className="btn btn-operation" onClick={() => performOperation(Operations.SUBTRACT)}>-</button>
          
          <button className="btn btn-roman" onClick={() => inputRomanSymbol('I')}>I</button>
          <button className="btn btn-number" onClick={() => inputDigit(0)}>0</button>
          <button className="btn btn-equals" onClick={calculate}>=</button>
          <button className="btn btn-operation" onClick={() => performOperation(Operations.ADD)}>+</button>
          
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button key={num} className="btn btn-number" onClick={() => inputDigit(num)}>
              {num}
            </button>
          ))}
        </div>

        <div className="info">
          <p>💡 Use Roman symbols (I, V, X, L, C, D, M) or numbers (0-9)</p>
          <p>Range: I - MMMCMXCIX (1 - 3999)</p>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
