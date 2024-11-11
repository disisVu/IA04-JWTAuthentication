export interface LoginUserRequest {
  email: string
  password: string
}

export interface LoginUserResponse {
  accessToken: string
}

export interface RegisterUserRequest {
  username: string
  email: string
  password: string
}
