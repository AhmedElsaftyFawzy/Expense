import express from "express"
import {
  getCookie,
  login,
  logout,
  me,
  register,
} from "../controllers/auth.controllers.js"
import { verifyToken } from "../middlewares/auths.middleware.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", verifyToken, logout)
router.get("/cookie", getCookie)
router.get("/me", verifyToken, me)

export default router
