import axios from 'axios'
import { axiosPrivate as api } from '~/api/api'
import { RootState, store } from '~/store'
import { LoginUserRequest, RegisterUserRequest } from '~/types/api/user'
import { User } from '~/types/schema'

// Set up a request interceptor to add the Authorization header
api.interceptors.request.use(
  (config) => {
    // Access the Redux store state
    const token = (store.getState() as RootState).auth.accessToken

    // If a token exists, add it to the request header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const validateToken = async (): Promise<{
  success: boolean
  message: string
}> => {
  try {
    const response = await api.get('/auth/validate-token')
    return { success: true, message: response.data.message }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        return { success: false, message: 'Unauthorized.' }
      }
    }
    return { success: false, message: 'Unauthorized.' }
  }
}

export const registerUser = async (data: RegisterUserRequest) => {
  try {
    const response = await api.post('/auth/register', data)
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

export const loginUser = async (data: LoginUserRequest) => {
  try {
    const response = await api.post('/auth/login', data)

    if (response.data && response.data.accessToken) {
      // Save token to local storage
      localStorage.setItem('accessToken', response.data.accessToken)

      return {
        success: true,
        message: 'Login successful',
        accessToken: response.data.accessToken,
        userInfo: response.data.userInfo
      }
    }

    return {
      success: false,
      message: 'Login failed'
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        return { success: false, message: `Email doesn't exist or password is wrong` }
      }
    }

    return { success: false, message: 'Login failed' }
  }
}

export const getUserProfile = async (): Promise<{
  success: boolean
  message: string
  data?: User
}> => {
  try {
    const response = await api.get('/auth/profile')

    if (response.data?.user) {
      const user: User = response.data.user
      return {
        success: true,
        message: 'Successfully fetched user profile.',
        data: user
      }
    }

    return {
      success: false,
      message: 'Failed to fetch user profile.'
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        return { success: false, message: 'Unauthorized.' }
      }
    }
    return { success: false, message: 'Failed to fetch user profile.' }
  }
}
