import React from "react"
import { Outlet } from "react-router-dom"
import NavBar from "./Navbar"
import { Container } from "reactstrap"

const Layout = () => {
  return (
    <div>
      <NavBar />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}

export default Layout
