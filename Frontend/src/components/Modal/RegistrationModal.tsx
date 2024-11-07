import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'

import { PasswordComplexityBar } from '~/components/Bar'
import { ButtonPrimary } from '~/components/Button/FullWidth'
import { PrimaryModal } from '~/components/Modal/ModalLayouts'
import { EmailTextField, PasswordTextField } from '~/components/TextField'
import { colors } from '~/styles'
import { useEmailTextField, usePasswordRegistrationTextField } from '~/hooks'
import { useState } from 'react'
import { registerUser } from '~/api/userApi'

export function RegistrationModal() {
  const navigate = useNavigate()
  const { email, emailIndicator, handleEmailChange } = useEmailTextField()
  const {
    password,
    passwordComplexity,
    passwordIndicator,
    handlePasswordChange,
    confirmPassword,
    confirmPasswordIndicator,
    handleConfirmPasswordChange
  } = usePasswordRegistrationTextField()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [statusMessage, setStatusMessage] = useState<string>('')

  const handleRegisterRender = () => {
    if (emailIndicator === '' && passwordIndicator === '' && confirmPasswordIndicator === '') {
      // Handle first submit attempt
      if (email === '' || password === '' || confirmPassword === '') {
        handleEmailChange(email)
        handlePasswordChange(password)
        handleConfirmPasswordChange(confirmPassword)
      }
      // Proceed with registration
      if (passwordComplexity > 0) {
        handleRegister()
      } else {
        setStatusMessage('Registration failed. Missing email or password is too weak')
      }
    } else {
      console.log('Please fill out the form correctly.')
    }
  }

  const handleRegister = async () => {
    setIsLoading(true)
    setStatusMessage('')

    try {
      const result = await registerUser(email, password)
      if (result.success) {
        setStatusMessage('Register successful')
        // Delay for 2 seconds before navigating
        setTimeout(() => {
          navigateToLogin()
        }, 2000)
      } else {
        setStatusMessage(result.message || 'Register failed')
      }
    } catch {
      setStatusMessage('An error occurred during registration')
    } finally {
      setIsLoading(false)
    }
  }

  const navigateToLogin = () => {
    navigate('/user/login')
  }

  return (
    <PrimaryModal isOpen={true}>
      <div className='w-full flex flex-col gap-10'>
        <Box className='w-full flex flex-col items-start gap-1'>
          <span style={{ color: colors.text_primary }} className='text-3xl font-bold'>
            Registration
          </span>
          <span style={{ color: colors.text_secondary }} className='text-sm'>
            Create an account
          </span>
        </Box>
        <Box className='w-full flex flex-col items-start gap-7'>
          {/* Input new email */}
          <EmailTextField value={email} indicator={emailIndicator} onChange={handleEmailChange} />
          {/* Input new password */}
          <Box className='relative w-full'>
            <PasswordTextField value={password} indicator={passwordIndicator} onChange={handlePasswordChange} />
            {password !== '' && <PasswordComplexityBar complexity={passwordComplexity} />}
          </Box>
          {/* Confirm password */}
          <PasswordTextField
            value={confirmPassword}
            indicator={confirmPasswordIndicator}
            onChange={handleConfirmPasswordChange}
            label='Confirm Password'
            placeholder='Re-enter password here'
          />
        </Box>
        <Box className='w-full flex flex-col items-center'>
          <span style={{ color: '#f00' }} className='mb-2 text-sm font-medium'>
            {statusMessage}
          </span>
          <ButtonPrimary
            enabled={true}
            text='Confirm'
            onClick={() => {
              handleRegisterRender()
            }}
            isLoading={isLoading}
          />
          <Box className='text-sm flex flex-row gap-2'>
            <span style={{ color: colors.text_secondary }}>Already have an account?</span>
            <span
              style={{ color: colors.primary }}
              className='font-medium cursor-pointer'
              onClick={() => {
                navigateToLogin()
              }}
            >
              Sign in
            </span>
          </Box>
        </Box>
      </div>
    </PrimaryModal>
  )
}
