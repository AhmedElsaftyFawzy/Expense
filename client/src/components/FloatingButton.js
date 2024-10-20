import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Cookies from "js-cookie"
import { useDispatch } from "react-redux"
import { addExpense } from "../features/auth/expenseSlice"
import { useJwt } from "react-jwt"

const FloatingButton = () => {
  const dispatch = useDispatch()
  const userCookie = Cookies.get("token")
  const { decodedToken } = useJwt(userCookie)
  const [show, setShow] = useState(false)
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setShow(false)
    const id = decodedToken._id
    const created = date
    dispatch(addExpense({ amount, description, created, id }))
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div className="float-button">
      <div className="icon" onClick={handleShow}>
        <i className="fa-solid fa-plus"></i>
      </div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Expense</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="number"
                  placeholder="Enter Amount"
                  name="amount"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Enter Description"
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="date"
                  placeholder="Enter Date"
                  name="date"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  )
}

export default FloatingButton
