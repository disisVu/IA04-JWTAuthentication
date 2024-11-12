import { User } from '~/types/schema'

export interface ValidateTokenResponse {
  success: boolean
  message: string
}

export interface LoginUserRequest {
  email: string
  password: string
}

export interface LoginUserResponse {
  success: boolean
  message: string
  data: {
    accessToken: string
    userInfo: User
  }
}

export interface RegisterUserRequest {
  username: string
  email: string
  password: string
}

export interface RegisterUserResponse {
  success: boolean
  message: string
  data: {
    user: User
  }
}

export interface GetUserProfileResponse {
  success: boolean
  message: string
  data: {
    user: User
  }
}
