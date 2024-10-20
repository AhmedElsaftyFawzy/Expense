import "bootstrap/dist/css/bootstrap.min.css"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import Layout from "./components/Layout"
import Error from "./pages/Error"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Singup from "./pages/Singup"
import ProtectedRoute from "./components/ProtectedRoute"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<Error />}>
      <Route element={<ProtectedRoute />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Singup />} />
    </Route>
  )
)
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
