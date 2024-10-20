import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = { isAuth: false, profile: {}, message: null, error: null }

export const login = createAsyncThunk("auth/login", async (values) => {
  try {
    const { email, password } = values
    console.log("Sending login request with:", { email, password })
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    // Log the response status
    console.log("Response status:", response.status)

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      const errorData = await response.json()
      console.error("Error response from server:", errorData)
      throw new Error(errorData.message || "Failed to login")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error during login request:", error)
    throw error // Re-throw the error to handle it in the rejected case
  }
})
export const singUp = createAsyncThunk("auth/singUp", async (values) => {
  try {
    const { name, email, password } = values
    console.log("Sending login request with:", { email, password })
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })

    // Log the response status
    console.log("Response status:", response.status)

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      const errorData = await response.json()
      console.error("Error response from server:", errorData)
      throw new Error(errorData.message || "Failed to login")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error during login request:", error)
    throw error // Re-throw the error to handle it in the rejected case
  }
})

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error during logout request:", error)
    throw error
  }
})
export const getToken = createAsyncThunk("auth/getToken", async () => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/cookie", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error during logout request:", error)
    throw error
  }
})
export const getMe = createAsyncThunk("auth/getMe", async () => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/cookie", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error during logout request:", error)
    throw error
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true
        state.profile = action.payload
        state.message = "User logged in successfully"
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message
      })
      .addCase(singUp.pending, (state, action) => {
        state.error = null
      })
      .addCase(singUp.fulfilled, (state, action) => {
        state.isAuth = true
        state.profile = action.payload
        state.message = "User registered successfully"
      })
      .addCase(singUp.rejected, (state, action) => {
        state.error = action.error.message
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isAuth = false
        state.profile = {}
        state.message = action.payload.message
        state.error = null
      })
      .addCase(getToken.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuth = true
        } else {
          state.isAuth = false
        }
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.profile = action.payload
      })
  },
})

export default authSlice.reducer
