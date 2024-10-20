import jwt from "jsonwebtoken"
import User from "./../models/User.js"

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1]
    if (!token) {
      return res.status(403).json({ message: "Access Denied" })
    }
    const { _id, role } = jwt.verify(token, process.env.JWTSECRET)
    const user = await User.findById(_id).select("-password")
    req.user = user
    next()
  } catch (err) {
    console.error(err)
    res.status(401).json({ message: "Invalid token", error: err.message })
  }
}
