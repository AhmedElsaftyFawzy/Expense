import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Cookies from "js-cookie"

const initialState = { loading: false, error: null, expenses: [] }

const cookie = Cookies.get("token")

export const fetchExpenses = createAsyncThunk(
  "expense/fetchExpenses",
  async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/expense", {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
      })
      const data = await response.json()
      return data
    } catch (error) {
      throw new Error("Error fetching expenses")
    }
  }
)
export const deleteExpenses = createAsyncThunk(
  "expense/deleteExpenses",
  async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/expense/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie}`,
          },
        }
      )
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
    }
  }
)

export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (expense) => {
    console.log(expense)
    try {
      const response = await fetch("http://localhost:5000/api/v1/expense", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
        body: JSON.stringify(expense),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message)
      }
      const data = await response.json()
      return data
    } catch (error) {
      throw new Error("Error adding expense")
    }
  }
)

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false
        state.expenses = action.payload
      })
      .addCase(fetchExpenses.rejected, (state) => {
        state.loading = false
        state.error = "Error fetching expenses"
      })
      .addCase(addExpense.pending, (state) => {
        state.loading = true
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.loading = false
        state.expenses.push(action.payload)
      })
      .addCase(addExpense.rejected, (state) => {
        state.loading = false
        state.error = "Error adding expense"
      })
      .addCase(deleteExpenses.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteExpenses.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(
          (exp) => exp !== action.payload.expense
        )
      })
      .addCase(deleteExpenses.rejected, (state) => {
        state.loading = false
        state.error = "Error deleting expense"
      })
  },
})

export default expenseSlice.reducer
