import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'

import { PasswordComplexityBar } from '~/components/Bar'
import { ButtonPrimary } from '~/components/Button/FullWidth'
import { PrimaryModal } from '~/components/Modal/ModalLayouts'
import { EmailTextField, FormTextField, PasswordTextField } from '~/components/TextField'
import { colors } from '~/styles'
import { usePasswordRegistrationTextField } from '~/hooks'
import { registerUser } from '~/api/userApi'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { RegistrationFormInputs } from '~/types/form'
import { computePasswordComplexity, emailRegex } from '../../utils'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export function RegistrationModal() {
  const navigate = useNavigate()
  const { password, passwordComplexity } = usePasswordRegistrationTextField()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [statusMessage, setStatusMessage] = useState<string>('')

  const {
    control,
    watch,
    trigger,
    handleSubmit,
    formState: { errors }
  } = useForm<RegistrationFormInputs>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const passwordValue = watch('password')

  const onSubmit: SubmitHandler<RegistrationFormInputs> = (data: RegistrationFormInputs) => {
    handleRegister(data)
  }

  const handleRegister = async (data: RegistrationFormInputs) => {
    setIsLoading(true)
    setStatusMessage('')

    try {
      const result = await registerUser(data.email, data.password)
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
      <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
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
            {/* Input username */}
            <Controller
              name='username'
              control={control}
              rules={{
                required: 'Required',
                minLength: { value: 3, message: 'Must contain at least 3 characters.' }
              }}
              render={({ field: { value, onChange } }) => (
                <FormTextField
                  value={value}
                  onChange={onChange}
                  label='Username'
                  placeholder='Enter username here'
                  icon={faUser}
                  indicator={errors.username ? errors.username.message || '' : ''}
                  error={errors.username!}
                />
              )}
            />
            {/* Input new email */}
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
            {/* Input new password */}
            <Box className='relative w-full mb-2'>
              <Controller
                name='password'
                control={control}
                rules={{
                  required: 'Required',
                  minLength: { value: 8, message: 'Must contain at least 8 characters.' },
                  validate: {
                    complexity: (value) => {
                      const complexity = computePasswordComplexity(value)
                      if (complexity < 3) {
                        return 'Password is too weak.'
                      }
                      return true
                    }
                  }
                }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <PasswordTextField
                      value={value}
                      onChange={(val: string) => {
                        onChange(val)
                        trigger('password')
                      }}
                      indicator={errors.password ? errors.password.message || '' : ''}
                      error={errors.password!}
                    />
                    <Box sx={{ bottom: '-10px' }} className='sm:absolute w-full pl-3'>
                      <PasswordComplexityBar complexity={computePasswordComplexity(value)} />
                    </Box>
                  </>
                )}
              />
              {password !== '' && <PasswordComplexityBar complexity={passwordComplexity} />}
            </Box>
            {/* Confirm password */}
            <Controller
              name='confirmPassword'
              control={control}
              rules={{
                required: 'Required',
                validate: (value) => value === passwordValue || 'Confirm password must match.'
              }}
              render={({ field: { value, onChange } }) => (
                <PasswordTextField
                  value={value}
                  onChange={(val: string) => {
                    onChange(val)
                    trigger('confirmPassword')
                  }}
                  indicator={errors.confirmPassword ? errors.confirmPassword.message || '' : ''}
                  error={errors.confirmPassword!}
                  label='Confirm Password'
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
      </form>
    </PrimaryModal>
  )
}
