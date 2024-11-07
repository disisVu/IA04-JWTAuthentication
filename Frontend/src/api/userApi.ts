import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE_URL
})

export const registerUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/users/register', { email, password })
    return { success: true, message: response.data.message }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Check if the error status is 409 for 'email already in use'
      if (error.response.status === 409) {
        return { success: false, message: 'Email already in use' }
      }
    }
    return { success: false, message: 'Registration failed' }
  }
}

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/users/login', { email, password })
    return { success: true, message: response.data.message }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Handle unauthorized (invalid credentials) response
      if (error.response.status === 401) {
        return { success: false, message: `Email doesn't exist or password is wrong` }
      }
    }
    return { success: false, message: 'Login failed' }
  }
}
