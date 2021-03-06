import {useState} from 'react'
import { Button, Stack } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import BudgetCard from './components/BudgetCard.js';
import AddBudgetModal from './components/AddBudgetModal.js';
import ViewExpensesModal from './components/ViewExpensesModal.js';
import AddExpenseModal from './components/AddExpenseModal.js';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard'
import TotalBudgetCard from './components/TotalBudgetCard'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetsContext';
import './App.css'

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal (budgetId){
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <div className="mainBody">
    <Container className="" >
      <Stack direction='horizontal' gap="2" className="mb-4">
        <h1 className="me-auto">Budgets</h1>
        <Button variant='success' onClick={()=>setShowAddBudgetModal(true)}>Add Budget</Button>
        <Button variant="outline-success" onClick={openAddExpenseModal}>Add Expense</Button>
      </Stack>

      {
        budgets.length === 0 
        ? 
        <div className="empty">Seems you don't have a budget/expense yet. Click on Add budget or Add Expense to get started. </div> 
        :
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem", alignItems: "flex-start",}}>

          {
            budgets.map(budget => 
              {
                const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
              return (
                <BudgetCard 
                key={budget.id} 
                name={budget.name} 
                amount={amount} 
                max={budget.max} 
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
                />
              )}
            )
          }
          <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal} onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}/>
          <TotalBudgetCard />
        </div>
      }

    </Container>

    <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)}/>
    <AddExpenseModal show={showAddExpenseModal} defaultBudgetId={addExpenseModalBudgetId} handleClose={() => setShowAddExpenseModal(false)}/>
    <ViewExpensesModal budgetId={viewExpensesModalBudgetId} handleClose={() => setViewExpensesModalBudgetId()}/>

    </div>
  );
}

export default App;
