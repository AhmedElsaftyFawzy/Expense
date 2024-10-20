import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./routers/auth.routes.js"
import expenseRoutes from "./routers/expense.routes.js"

const app = express()
dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)

const PORT = process.env.PORT || 5000

//Routes

app.use("/api/auth", authRoutes)
app.use("/api/v1", expenseRoutes)

app.use((req, res, next) => {
  res.status(404).json({ message: "Page not found" })

  next()
})

// connect to Database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err))

// listen on Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
