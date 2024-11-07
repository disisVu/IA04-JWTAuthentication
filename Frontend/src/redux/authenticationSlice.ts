import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '~/types/schema'

interface AuthenticationState {
  userAccount: User
}

const initialState: AuthenticationState = {
  userAccount: {
    email: '',
    password: ''
  }
}

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    saveAuthentication: (state: AuthenticationState, action: PayloadAction<User>) => {
      state.userAccount = action.payload
    },
    removeAuthentication: (state: AuthenticationState) => {
      state.userAccount = initialState.userAccount
    }
  }
})

export const { saveAuthentication, removeAuthentication } = authenticationSlice.actions
export default authenticationSlice.reducer
