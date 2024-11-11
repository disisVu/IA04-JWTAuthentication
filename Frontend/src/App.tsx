import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'

import { AuthenticationLayout, MainLayout } from '~/layouts'
import { HomePage, LoginPage, ProfilePage, RegistrationPage } from '~/pages'
import { theme } from '~/theme'
import { Provider } from 'react-redux'
import { store } from '~/store'
import '~/App.css'
import { ProtectedRoute } from './route/protectedRoute'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path='/' element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path='/profile' element={<ProfilePage />} />
              </Route>
            </Route>
            <Route path='/auth' element={<AuthenticationLayout />}>
              <Route path='login' element={<LoginPage />} />
              <Route path='registration' element={<RegistrationPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default App
