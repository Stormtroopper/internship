import { useReducer, useCallback } from "react";
import Digits from "./Digits";
import Operations from "./Operations";
import "./styling.css";

// Constants for better maintainability
const ACTION_TYPES = {
  ADD_DIGIT: "ADD_DIGIT",
  CHOOSE_OPERATION: "CHOOSE_OPERATION",
  CLEAR: "CLEAR",
  DELETE_DIGIT: "DELETE_DIGIT",
  EVALUATE: "EVALUATE",
};

const OPERATIONS = {
  ADD: "+",
  SUBTRACT: "-",
  MULTIPLY: "*",
  DIVIDE: "÷",
};

// Initial state
const initialState = {
  currentOperand: null,
  previousOperand: null,
  operation: null,
  overwrite: false,
};

// Utility functions
const isValidNumber = (num) => !isNaN(parseFloat(num)) && isFinite(num);

const performCalculation = (prev, current, operation) => {
  const prevNum = parseFloat(prev);
  const currentNum = parseFloat(current);
  
  if (!isValidNumber(prevNum) || !isValidNumber(currentNum)) {
    return "";
  }

  const operations = {
    [OPERATIONS.ADD]: () => prevNum + currentNum,
    [OPERATIONS.SUBTRACT]: () => prevNum - currentNum,
    [OPERATIONS.MULTIPLY]: () => prevNum * currentNum,
    [OPERATIONS.DIVIDE]: () => {
      if (currentNum === 0) return "Error"; // Handle division by zero
      return prevNum / currentNum;
    },
  };

  const result = operations[operation]?.();
  return result !== undefined ? result.toString() : "";
};

const formatOperand = (operand) => {
  if (operand == null) return "";
  
  if (operand === "Error") return operand;
  
  const [integer, decimal] = operand.split(".");
  const formattedInteger = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(integer);
  
  return decimal == null 
    ? formattedInteger 
    : `${formattedInteger}.${decimal}`;
};

// Reducer function
const calculatorReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.ADD_DIGIT: {
      const { digit } = payload;
      
      // Handle overwrite after evaluation
      if (state.overwrite) {
        return {
          ...initialState,
          currentOperand: digit,
        };
      }
      
      // Prevent multiple zeros at start
      if (digit === "0" && state.currentOperand === "0") {
        return state;
      }
      
      // Prevent multiple decimal points
      if (digit === "." && state.currentOperand?.includes(".")) {
        return state;
      }
      
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${digit}`,
      };
    }
    
    case ACTION_TYPES.CHOOSE_OPERATION: {
      const { operation } = payload;
      
      // No operands available
      if (!state.currentOperand && !state.previousOperand) {
        return state;
      }
      
      // Only change operation if no current operand
      if (!state.currentOperand) {
        return {
          ...state,
          operation,
        };
      }
      
      // First operation selection
      if (!state.previousOperand) {
        return {
          ...state,
          operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      
      // Chain operations - evaluate current then set new operation
      return {
        ...state,
        previousOperand: performCalculation(
          state.previousOperand,
          state.currentOperand,
          state.operation
        ),
        operation,
        currentOperand: null,
      };
    }
    
    case ACTION_TYPES.CLEAR:
      return initialState;
    
    case ACTION_TYPES.DELETE_DIGIT: {
      // Handle overwrite state
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      
      if (!state.currentOperand) return state;
      
      // If only one digit, clear it
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }
      
      // Remove last digit
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    }
    
    case ACTION_TYPES.EVALUATE: {
      // Need all three components to evaluate
      if (!state.operation || !state.currentOperand || !state.previousOperand) {
        return state;
      }
      
      return {
        ...initialState,
        currentOperand: performCalculation(
          state.previousOperand,
          state.currentOperand,
          state.operation
        ),
        overwrite: true,
      };
    }
    
    default:
      return state;
  }
};

// Main App Component
function App() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const { currentOperand, previousOperand, operation } = state;

  // Memoized dispatch functions for better performance
  const handleAddDigit = useCallback((digit) => {
    dispatch({
      type: ACTION_TYPES.ADD_DIGIT,
      payload: { digit },
    });
  }, []);

  const handleChooseOperation = useCallback((operation) => {
    dispatch({
      type: ACTION_TYPES.CHOOSE_OPERATION,
      payload: { operation },
    });
  }, []);

  const handleClear = useCallback(() => {
    dispatch({ type: ACTION_TYPES.CLEAR });
  }, []);

  const handleDelete = useCallback(() => {
    dispatch({ type: ACTION_TYPES.DELETE_DIGIT });
  }, []);

  const handleEvaluate = useCallback(() => {
    dispatch({ type: ACTION_TYPES.EVALUATE });
  }, []);

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">
          {formatOperand(currentOperand)}
        </div>
      </div>
      
      <button className="span-two" onClick={handleClear}>
        AC
      </button>
      <button onClick={handleDelete}>DEL</button>
      
      <Operations 
        operation={OPERATIONS.DIVIDE} 
        dispatch={handleChooseOperation} 
      />
      
      {/* Number buttons */}
      {["1", "2", "3"].map((digit) => (
        <Digits key={digit} digit={digit} dispatch={handleAddDigit} />
      ))}
      <Operations 
        operation={OPERATIONS.MULTIPLY} 
        dispatch={handleChooseOperation} 
      />
      
      {["4", "5", "6"].map((digit) => (
        <Digits key={digit} digit={digit} dispatch={handleAddDigit} />
      ))}
      <Operations 
        operation={OPERATIONS.ADD} 
        dispatch={handleChooseOperation} 
      />
      
      {["7", "8", "9"].map((digit) => (
        <Digits key={digit} digit={digit} dispatch={handleAddDigit} />
      ))}
      <Operations 
        operation={OPERATIONS.SUBTRACT} 
        dispatch={handleChooseOperation} 
      />
      
      <Digits digit="." dispatch={handleAddDigit} />
      <Digits digit="0" dispatch={handleAddDigit} />
      
      <button className="span-two" onClick={handleEvaluate}>
        =
      </button>
    </div>
  );
}

export default App;
