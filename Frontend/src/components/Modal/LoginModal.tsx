import { Box } from '@mui/material'
import { PrimaryModal } from '~/components/Modal/ModalLayouts'
import { colors } from '~/styles'
import { EmailTextField, PasswordTextField } from '~/components/TextField'
import { ButtonPrimary } from '~/components/Button/FullWidth'
import { useNavigate } from 'react-router-dom'
import { useEmailTextField, usePasswordTextField } from '~/hooks'
import { useState } from 'react'
import { loginUser } from '~/api/userApi'
import { useDispatch } from 'react-redux'
import { saveAuthentication } from '~/redux/authenticationSlice'

export function LoginModal() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { email, emailIndicator, handleEmailChange } = useEmailTextField()
  const { password, passwordIndicator, handlePasswordChange } = usePasswordTextField()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [statusMessage, setStatusMessage] = useState<string>('')

  const handleLoginRender = () => {
    if (emailIndicator === '' && passwordIndicator === '') {
      // Handle first submit attempt
      if (email === '' || password === '') {
        handleEmailChange(email)
        handlePasswordChange(password)
        setStatusMessage('Please enter both fields correctly')
      } else {
        // Proceed with login
        handleLogin()
      }
    } else {
      console.log('Please fill out the form correctly.')
    }
  }

  const handleLogin = async () => {
    setIsLoading(true)
    setStatusMessage('')

    try {
      const result = await loginUser(email, password)
      console.log(result)
      if (result.success) {
        setStatusMessage('Login successful')
        dispatch(
          saveAuthentication({
            email,
            password: ''
          })
        )
        // Delay for 2 seconds before navigating
        setTimeout(() => {
          navigateToHomePage()
        }, 2000)
      } else {
        setStatusMessage(result.message || 'Login failed')
      }
    } catch {
      setStatusMessage('An error occurred during registration')
    } finally {
      setIsLoading(false)
    }
  }

  const navigateToHomePage = () => {
    navigate('/')
  }

  const navigateToRegistration = () => {
    navigate('/user/registration')
  }

  return (
    <PrimaryModal isOpen={true}>
      <div className='w-full flex flex-col gap-8'>
        <Box className='w-full flex flex-col items-start gap-1'>
          <span style={{ color: colors.text_primary }} className='text-3xl font-bold'>
            Login
          </span>
          <span style={{ color: colors.text_secondary }} className='text-sm'>
            Welcome back!
          </span>
        </Box>
        <Box className='w-full flex flex-col items-start gap-4'>
          <EmailTextField value={email} indicator={emailIndicator} onChange={handleEmailChange} />
          <PasswordTextField value={password} indicator={passwordIndicator} onChange={handlePasswordChange} />
        </Box>
        <Box className='w-full flex flex-col items-center'>
          <span style={{ color: '#f00' }} className='mb-2 text-sm font-medium'>
            {statusMessage}
          </span>
          <ButtonPrimary
            enabled={true}
            text='Confirm'
            onClick={() => {
              handleLoginRender()
            }}
            isLoading={isLoading}
          />
          <Box className='text-sm flex flex-row gap-2'>
            <span style={{ color: colors.text_secondary }}>Don't have an account?</span>
            <span
              style={{ color: colors.primary }}
              className='font-medium cursor-pointer'
              onClick={() => {
                navigateToRegistration()
              }}
            >
              Sign up
            </span>
          </Box>
        </Box>
      </div>
    </PrimaryModal>
  )
}
