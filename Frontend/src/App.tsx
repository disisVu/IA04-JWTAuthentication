import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'

import { AuthenticationLayout, MainLayout } from '~/layouts'
import { HomePage, LoginPage, RegistrationPage } from '~/pages'
import { theme } from '~/theme'
import '~/App.css'
import { Provider } from 'react-redux'
import { store } from '~/store'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route index element={<HomePage />} />
            </Route>
            <Route path='/user' element={<AuthenticationLayout />}>
              <Route path='/user/login' element={<LoginPage />} />
              <Route path='/user/registration' element={<RegistrationPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default App
