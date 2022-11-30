import { useBudgets } from "./BudgetsContext"
import BudgetCard from "./BudgetCard"
import { useState } from "react"

export default function TotalBudgetCard() {
  const { expenses, budgets } = useBudgets()
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo")))

  const amount = expenses.reduce((total, expense) => total + expense.amount, 0)
  const max = userInfo.mainbudget.value
  if (max === 0) return null

  return <BudgetCard amount={amount} name="Total" gray max={max} hideButtons />
}