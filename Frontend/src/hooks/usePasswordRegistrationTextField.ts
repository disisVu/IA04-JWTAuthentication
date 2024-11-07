import { useMemo, useState } from 'react'
import { computePasswordComplexity } from '~/utils'

export function usePasswordRegistrationTextField(initialValue = '') {
  const [password, setPassword] = useState<string>(initialValue)
  const [passwordIndicator, setPasswordIndicator] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>(initialValue)
  const [confirmPasswordIndicator, setConfirmPasswordIndicator] = useState<string>('')
  const passwordComplexity = useMemo(() => computePasswordComplexity(password), [password])

  const handlePasswordChange = (value: string) => {
    setPassword(value)

    if (value === '') {
      setPasswordIndicator('Required')
    } else {
      setPasswordIndicator('')
    }

    if (value !== confirmPassword && confirmPassword !== '') {
      setConfirmPasswordIndicator('Unmatched')
    } else {
      setConfirmPasswordIndicator('')
    }
  }

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value)
    if (value === '') {
      setConfirmPasswordIndicator('Required')
    } else if (value !== password) {
      setConfirmPasswordIndicator('Unmatched')
    } else {
      setConfirmPasswordIndicator('')
    }
  }

  return {
    password,
    passwordComplexity,
    passwordIndicator,
    handlePasswordChange,
    confirmPassword,
    confirmPasswordIndicator,
    handleConfirmPasswordChange
  }
}
