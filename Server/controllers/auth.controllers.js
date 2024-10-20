import User from "../models/User.js"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  const { name, email, password, joined } = req.body
  try {
    const existingUser = await User.findOne({ email: email })
    if (existingUser)
      return res.status(400).json({ message: "User already exists" })

    const user = new User({ name, email, password, joined })
    await user.save()
    res
      .status(201)
      .json({ message: "User registered successfully", user: user })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error", err: err.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email: email })
    if (!user || !(await user.matchPassword(password)))
      return res.status(400).json({ message: "Invalid email or password" })

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWTSECRET,
      {
        expiresIn: 60 * 60 * 24 * 1000,
      }
    )
    res.cookie("token", token, {
      expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
      secure: false, // Set to true if you're using HTTPS
      sameSite: "strict", // Set to 'none' if you're using HTTPS
    })

    res.status(201).json({ message: "User logged in successfully", user })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error", err: err.message })
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("token")
    res.json({ message: "User logged out successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getCookie = (req, res) => {
  if (req.cookies.token) {
    return res.status(200).json({ exists: true })
  }
  return res.status(200).json({ exists: false })
}

export const me = async (req, res) => {
  const token = req.cookies.token
  const { _id, role } = jwt.verify(token, process.env.JWTSECRET)
  try {
    const user = await User.findById(_id).select("-password")
    req.user = user
    res.json({ user })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error", err: err.message })
  }
}
