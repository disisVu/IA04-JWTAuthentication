import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearAuthState } from '~/store/reducers/authSlice'

export function useLogout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    dispatch(clearAuthState())
    navigate('/auth/login')
  }

  return { handleLogout }
}
