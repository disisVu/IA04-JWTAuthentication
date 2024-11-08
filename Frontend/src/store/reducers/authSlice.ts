import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '~/types/schema'

interface AuthState {
  accessToken: string
  userInfo: User
}

const initialState: AuthState = {
  accessToken: '',
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
    }
  }
})

export const { setToken, removeToken } = authenticationSlice.actions
export default authenticationSlice.reducer
