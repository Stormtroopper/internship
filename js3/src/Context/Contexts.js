import React, { useContext } from "react"
import { v4 as uuidV4 } from 'uuid'
import useLocalStorage from "../Custom_Hooks/useLocalStorage"
const BudgetsContext = React.createContext()
export const useBudgets = () => {
    return useContext(BudgetsContext)
}
export default function BudgetsProvider({ children }) {
    const [budgets, setBudgets] = useLocalStorage("budgets", []);
    const [expenses, setExpense] = useLocalStorage("expenses", []);
    const getBudgetExpense = (budgetId) => {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }
    const addBudget = ({ name, max }) => {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets
            }
            return [...prevBudgets, { id: uuidV4(), name, max }]
        })
    }
    const addExpense = (description, amount, budgetId) => {
        setExpense(prevExpense => {

            return [...prevExpense, { id: uuidV4(), description, amount, budgetId }]
        })
    }
    // const deleteBudget = ({ id }) => {

    //     setBudgets(prevBudgets => {
    //         return prevBudgets.filter(budget => budget.id !== id)
    //     })
    // }
    const deleteExpense = ({ id }) => {
        setExpense(prevExpense => {
            return prevExpense.filter(expense => expense.id !== id)
        })
    }






    return <BudgetsContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpense,
        addExpense,
        addBudget,
        deleteExpense
    }
    }> {children}</BudgetsContext.Provider >
}