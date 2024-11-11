import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { useEffect, useState } from 'react'
import { validateToken } from '~/api/userApi'
import { Loader } from '~/components/Loader/LoaderIndicator'

export function ProtectedRoute() {
  const token = useSelector((state: RootState) => state.auth.accessToken) || localStorage.getItem('accessToken')
  const [isTokenValid, setIsTokenValid] = useState<boolean>(false)
  const [isChecking, setIsChecking] = useState<boolean>(true)

  useEffect(() => {
    const handleValidateToken = async () => {
      if (!token) {
        console.log('No token.')
        setIsChecking(false)
        return
      }
      try {
        const response = await validateToken()
        console.log('Authorized: ' + response.success)
        setIsTokenValid(response.success)
      } catch {
        setIsTokenValid(false)
      } finally {
        setIsChecking(false)
      }
    }
    handleValidateToken()
  }, [token])

  if (isChecking) return <Loader />

  return isTokenValid ? <Outlet /> : <Navigate to='/auth/login' />
}
