import express from "express"
import {
  create,
  deleteExpense,
  getExpense,
  getExpenseBydDate,
  updateExpense,
} from "../controllers/expense.controllers.js"
import { verifyToken } from "../middlewares/auths.middleware.js"

const router = express.Router()

router.get("/expense", verifyToken, getExpense)
router.get("/expense/date", verifyToken, getExpenseBydDate)
router.post("/expense", verifyToken, create)
router.put("/expense/:id", verifyToken, updateExpense)
router.delete("/expense/:id", verifyToken, deleteExpense)

export default router
