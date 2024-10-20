import { FormGroup, Label, Input, Button, FormFeedback } from "reactstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../features/auth/authSlice"

const Login = () => {
  const { message, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Password is required"),
    }),

    onSubmit: (values) => {
      dispatch(login(values))
      navigate("/")
    },
  })

  return (
    <div>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      <form onSubmit={formik.handleSubmit}>
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
          Login
        </Button>
      </form>
      <p>
        If You Do't Have An Acount <Link to="/register">SingUp</Link>
      </p>
    </div>
  )
}

export default Login
