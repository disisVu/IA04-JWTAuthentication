import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '~/store'
import { ButtonPrimary } from '~/components/Button/FullWidth'
import { removeToken } from '~/store/reducers/authSlice'
import { useNavigate } from 'react-router-dom'

export function HomePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userInfo = useSelector((state: RootState) => state.auth.userInfo)
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)

  const handleLogOut = () => {
    dispatch(removeToken())
    navigate('/user/login')
  }

  return (
    <div className='flex flex-col m-20 gap-6'>
      <span>Logged in as {userInfo.email}</span>
      <span>Token: {accessToken}</span>
      <ButtonPrimary enabled={true} text='Log out' onClick={handleLogOut} />
    </div>
  )
}
