import { useState } from 'react'

export function usePasswordTextField(initialValue = '') {
  const [password, setPassword] = useState<string>(initialValue)
  const [passwordIndicator, setPasswordIndicator] = useState<string>('')

  const handlePasswordChange = (value: string) => {
    setPassword(value)

    // Set indicator based on validation logic
    if (value === '') {
      setPasswordIndicator('Required')
    } else {
      setPasswordIndicator('')
    }
  }

  return { password, passwordIndicator, handlePasswordChange }
}
