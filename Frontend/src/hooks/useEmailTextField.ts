import { useState } from 'react'
import { emailRegex } from '~/utils'

export function useEmailTextField(initialValue = '') {
  const [email, setEmail] = useState<string>(initialValue)
  const [emailIndicator, setEmailIndicator] = useState<string>('')

  const handleEmailChange = (value: string) => {
    setEmail(value)

    // Set indicator based on validation logic
    if (value === '') {
      setEmailIndicator('Required')
    } else if (!emailRegex.test(value)) {
      setEmailIndicator('Invalid format')
    } else {
      setEmailIndicator('')
    }
  }

  return { email, emailIndicator, handleEmailChange }
}
