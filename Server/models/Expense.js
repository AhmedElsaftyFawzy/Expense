import mongoose from "mongoose"

const expenseSchema = mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String },
  created: { type: Date, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})

const Expense = mongoose.model("Expense", expenseSchema)

export default Expense
