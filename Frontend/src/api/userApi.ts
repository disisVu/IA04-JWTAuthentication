import { axiosPrivate as api } from '~/api/api'
import { RootState, store } from '~/store'
import {
  GetUserProfileResponse,
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest,
  RegisterUserResponse,
  ValidateTokenResponse
} from '~/types/api/user'

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

export const validateToken = async (): Promise<ValidateTokenResponse> => {
  try {
    const response = await api.get('/auth/validate-token')
    return response.data
  } catch {
    throw new Error('Error: Validate token')
  }
}

export const registerUser = async (data: RegisterUserRequest): Promise<RegisterUserResponse> => {
  try {
    const response = await api.post('/auth/register', data)
    return response.data
  } catch {
    throw new Error('Error: Register user')
  }
}

export const loginUser = async (data: LoginUserRequest): Promise<LoginUserResponse> => {
  try {
    const response = await api.post('/auth/login', data)
    return response.data
  } catch {
    throw new Error('Error: Login user')
  }
}

export const getUserProfile = async (): Promise<GetUserProfileResponse> => {
  try {
    const response = await api.get('/auth/profile')
    return response.data
  } catch {
    throw new Error('Error: Get user profile')
  }
}
