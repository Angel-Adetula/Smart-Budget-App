import { Modal, Button, Stack } from "react-bootstrap"
import { useBudgets } from "./BudgetsContext"
import { currencyFormatter } from "./utils"

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets()

  const expenses = getBudgetExpenses(budgetId)
  const budget = budgets.filter(b => b.category === budgetId)

return (
<Modal show={budgetId != null} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>
      <Stack direction="horizontal" gap="2">
        <div>Expenses - {budget.category}</div>
        </Stack>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Stack direction="vertical" gap="3">
        {expenses.map(expense => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
            <div className="me-auto fs-4">{expense.description}</div>
            <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
            </div>
            <Button
                onClick={() => deleteExpense(expense)}
                size="sm"
                variant="outline-danger"
            >
                &times;
            </Button>
            </Stack>
        ))}
        </Stack>
        </Modal.Body>
        </Modal>
)
}