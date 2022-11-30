import React, { useContext, useState } from "react"
import { v4 as uuidV4 } from "uuid"
import useLocalStorage from "../useLocalStorage"

const BudgetsContext = React.createContext()


export function useBudgets() {
  return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("subBudgets", [])
    const [expenses, setExpenses] = useLocalStorage("transactions", [])

  function getBudgetExpenses(budgetName) {
    return expenses.filter(expense => expense.budgetName === budgetName)
  }
  function addExpense({ description, amount, budgetName }) {
    setExpenses(prevExpenses => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetName }]
    })
  }


  function deleteExpense({ id }) {
    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== id)
    })
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  )
}