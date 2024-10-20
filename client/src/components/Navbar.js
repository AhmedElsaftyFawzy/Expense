import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap"
import { getToken, logout } from "../features/auth/authSlice"

const NavBar = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  useEffect(() => {
    dispatch(getToken())
  }, [dispatch])

  const { isAuth } = useSelector((state) => state.auth)
  return (
    <div>
      <Navbar color="dark" dark>
        <NavbarBrand href="/">Expense</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            {isAuth && (
              <NavItem>
                <Button onClick={() => dispatch(logout())}>Logout</Button>
              </NavItem>
            )}
            {!isAuth && (
              <NavItem>
                <NavLink href="/login/">Login</NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default NavBar
