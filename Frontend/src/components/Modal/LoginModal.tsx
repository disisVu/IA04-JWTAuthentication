import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

import { Box } from '@mui/material'

import { loginUser } from '~/api/userApi'
import { PrimaryModal } from '~/components/Modal/ModalLayouts'
import { ButtonPrimary } from '~/components/Button/FullWidth'
import { EmailTextField, PasswordTextField } from '~/components/TextField'
import { saveAuthentication } from '~/redux/authenticationSlice'
import { colors } from '~/styles'
import { LoginFormInputs } from '~/types/form'
import { emailRegex } from '~/utils'

export function LoginModal() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [statusMessage, setStatusMessage] = useState<string>('')

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<LoginFormInputs> = (data: LoginFormInputs) => {
    handleLogin(data)
  }

  const handleLogin = async (data: LoginFormInputs) => {
    setIsLoading(true)
    setStatusMessage('')

    try {
      const result = await loginUser(data.email, data.password)
      console.log(result)
      if (result.success) {
        setStatusMessage('Login successful')
        dispatch(
          saveAuthentication({
            email: data.email,
            password: data.password
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
      <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
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
            <Controller
              name='email'
              control={control}
              rules={{
                required: 'Required',
                pattern: { value: emailRegex, message: 'Invalid email format.' }
              }}
              render={({ field: { value, onChange } }) => (
                <EmailTextField
                  value={value}
                  onChange={onChange}
                  indicator={errors.email ? errors.email.message || '' : ''}
                  error={errors.email!}
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              rules={{
                required: 'Required',
                minLength: { value: 8, message: 'Password must contain at least 8 characters.' }
              }}
              render={({ field: { value, onChange } }) => (
                <PasswordTextField
                  value={value}
                  onChange={onChange}
                  indicator={errors.password ? errors.password.message || '' : ''}
                  error={errors.password!}
                />
              )}
            />
          </Box>
          <Box className='w-full flex flex-col items-center'>
            <span style={{ color: '#f00' }} className='mb-2 text-sm font-medium'>
              {statusMessage}
            </span>
            <ButtonPrimary enabled={true} text='Confirm' onClick={handleSubmit(onSubmit)} isLoading={isLoading} />
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
      </form>
    </PrimaryModal>
  )
}
