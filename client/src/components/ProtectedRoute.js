import React from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"

const ProtectedRoute = () => {
  const navigate = useNavigate()
  const { isAuth } = useSelector((state) => state.auth)
  if (!isAuth) {
    navigate("/login")
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default ProtectedRoute
