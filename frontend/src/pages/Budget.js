import Container from "react-bootstrap/Container"
import BudgetCard from "./component/BudgetCard";
import {Button, Stack} from "react-bootstrap"
import { useState } from "react";
import AddExpenseModal from "./component/AddExpenseModal";
import { useBudgets } from "./component/BudgetsContext"
import TotalBudgetCard from "./component/TotalBudgetCard";
import ViewExpensesModal from "./component/ViewExpensesModal";



const Budget  = () => {
    
    const [showAddExpenseModal, setShowAddExpenseModal] =useState(false)
    const [addExpenseModalBuddget, setAddExpenseModalBuddget] = useState()
    const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()

    const { budgets, getBudgetExpenses } = useBudgets()

    function openAddExpenseModal(budgetName){
        setShowAddExpenseModal(true)
        setAddExpenseModalBuddget(budgetName)
    }
    function getBankTransactions() {

        window.location.replace("http://localhost:8000/index.html")
      }

    return(
        <>
        {console.log(budgets)}
        <Container className="my-4">
            <Stack direction = "horizontal" gap="2" className="mb-4">
                <h1 className="me-auto">Budgets</h1>
                <Button variant="primary" onClick={getBankTransactions}> Retrieve Transactions</Button>
            </Stack>
            <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:"1rem", alignItems:"flex-start"}}>
                {console.log(budgets)}

            {budgets.map(budget =>{
                const amount = getBudgetExpenses(budget.category).reduce(
                    (total, expense) => total + expense.amount,
                    0
                  )
                  
            return (
            <BudgetCard 
            name={budget.category}
            gray 
            amount={amount} 
            max={budget.value}
            onAddExpenseClick = {() => openAddExpenseModal(budget.category)}
            onViewExpensesClick={() =>
                setViewExpensesModalBudgetId(budget.category)}
            />
            )
            })}
             <TotalBudgetCard />
            </div>
        </Container>
        <AddExpenseModal
        show = {showAddExpenseModal}
        defaultBudgetId={addExpenseModalBuddget}
        handleClose={()=> setShowAddExpenseModal(false)}
        />
        <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
        </>
    )
}

export default Budget;