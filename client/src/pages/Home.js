import React, { useEffect } from "react"
import FloatingButton from "../components/FloatingButton"
import { useDispatch, useSelector } from "react-redux"
import { fetchExpenses, deleteExpenses } from "../features/auth/expenseSlice"

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchExpenses())
  }, [dispatch])

  const expenses = useSelector((state) => state.expense.expenses)
  const handleDelete = (id) => {
    dispatch(deleteExpenses(id))
  }

  return (
    <div>
      <div className="expense-container">
        <h3>Amount</h3>
        <h3>Description</h3>
        <h3>Date</h3>
      </div>

      {expenses &&
        expenses.map((expense) => (
          <div key={expense._id} className="expense-container">
            <p>{expense.amount}</p>
            <p>{expense.description}</p>
            <p>{expense.created}</p>
            <button onClick={() => handleDelete(expense._id)}> Delete </button>
          </div>
        ))}
      <FloatingButton />
    </div>
  )
}

export default Home
