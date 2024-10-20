import Expense from "../models/Expense.js"

export const getExpense = async (req, res) => {
  try {
    const expenses = await Expense.find({ owner: req.user._id }).sort({
      created: -1,
    })
    res.json(expenses)
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
}

export const getExpenseBydDate = async (req, res) => {
  try {
    const startDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    )
    const endDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    )
    const expenses = await Expense.find({
      owner: req.user._id,
      created: { $gte: new Date(startDate), $lte: new Date(endDate) },
    }).sort({ created: -1 })
    res.json(expenses)
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
}

export const create = async (req, res) => {
  try {
    const { amount, description, created } = req.body
    const expense = await new Expense({
      amount,
      description,
      created,
      owner: req.user,
    })
    await expense.save()
    res.status(201).json(expense)
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
}

export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id)
    if (!expense) return res.status(404).json({ message: "Expense not found" })
    if (expense.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" })
    }
    await expense.updateOne(req.body, { new: true })
    res.json(expense)
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
}

export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id)
    if (!expense) return res.status(404).json({ message: "Expense not found" })
    if (expense.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" })
    }
    await expense.deleteOne()
    res.json({ message: "Expense deleted successfully", expense })
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
}
