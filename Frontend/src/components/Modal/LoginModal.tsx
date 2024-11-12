import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { Box } from '@mui/material'

import { ButtonPrimary } from '~/components/Button/FullWidth'
import { PrimaryModal } from '~/components/Modal/ModalLayouts'
import { EmailTextField, PasswordTextField } from '~/components/TextField'
import { saveUserInfo, setToken } from '~/store/reducers/authSlice'
import { colors } from '~/styles'
import { emailRegex } from '~/utils'
import { loginUser } from '~/api/userApi'
import { LoginFormInputs } from '~/types/form'
import { useSnackbar } from 'notistack'

export function LoginModal() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

    try {
      const response = await loginUser({
        email: data.email,
        password: data.password
      })
      if (response.success) {
        const { accessToken, userInfo } = response.data
        localStorage.setItem('accessToken', accessToken)
        dispatch(setToken(accessToken))
        dispatch(saveUserInfo(userInfo))
        // Delay for 2 seconds before navigating
        setTimeout(() => {
          navigateToHomePage()
        }, 2000)
      }
      enqueueSnackbar(response.message, { variant: response.success ? 'success' : 'error' })
    } catch (error) {
      console.log(error)
      enqueueSnackbar('An error occurred during login', { variant: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  const navigateToHomePage = () => {
    navigate('/profile')
  }

  const navigateToRegistration = () => {
    navigate('/auth/registration')
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
