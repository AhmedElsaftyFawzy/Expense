import { FormGroup, Label, Input, Button, FormFeedback } from "reactstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { singUp } from "../features/auth/authSlice"

const Singup = () => {
  const { message, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Password is required"),
    }),

    onSubmit: (values) => {
      dispatch(singUp(values))
      navigate("/login")
    },
  })

  return (
    <div>
      <h2>Sign Up</h2>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      <form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <Label for="Name">Name</Label>
          <Input
            id="Name"
            name="name"
            placeholder="Name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            invalid={formik.touched.name && !!formik.errors.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <FormFeedback>{formik.errors.name}</FormFeedback>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label for="Email">Email</Label>
          <Input
            id="Email"
            name="email"
            placeholder="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            invalid={formik.touched.email && !!formik.errors.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <FormFeedback>{formik.errors.email}</FormFeedback>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label for="Password">Password</Label>
          <Input
            id="Password"
            name="password"
            placeholder="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            invalid={formik.touched.password && !!formik.errors.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <FormFeedback>{formik.errors.password}</FormFeedback>
          ) : null}
        </FormGroup>
        <Button type="submit" block color="primary">
          Sing Up
        </Button>
      </form>
      <p>
        If You Have An Acount <Link to="/login">Login</Link>
      </p>
    </div>
  )
}

export default Singup
