import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '~/store'
import { ButtonPrimary } from '~/components/Button/FullWidth'
import { removeAuthentication } from '~/redux/authenticationSlice'
import { useNavigate } from 'react-router-dom'

export function HomePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userAccount = useSelector((state: RootState) => state.authentication.userAccount)

  const handleLogOut = () => {
    dispatch(removeAuthentication())
    navigate('/user/login')
  }

  return (
    <div className='flex flex-col m-20 gap-6'>
      <span>Logged in as {userAccount.email}</span>
      <ButtonPrimary enabled={true} text='Log out' onClick={handleLogOut} />
    </div>
  )
}
