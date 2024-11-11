import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '~/types/schema'

interface AuthState {
  accessToken: string
  userInfo: User
}

const initialState: AuthState = {
  accessToken: localStorage.getItem('accessToken') || '',
  userInfo: {
    username: '',
    email: ''
  }
}

export const authenticationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state: AuthState, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    removeToken: (state: AuthState) => {
      state.accessToken = ''
    },
    saveUserInfo: (state: AuthState, action: PayloadAction<User>) => {
      state.userInfo = action.payload
    }
  }
})

export const { setToken, removeToken, saveUserInfo } = authenticationSlice.actions
export default authenticationSlice.reducer
