import { useEffect, useState } from 'react'
import { User } from '~/types/schema'
import { getUserProfile } from '~/api/userApi'
import Loader from '../../components/Loader/LoaderIndicator'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

export function ProfilePage() {
  const [profile, setProfile] = useState<User | undefined>()
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  const userInfo = useSelector((state: RootState) => state.auth.userInfo)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [statusMessage, setStatusMessage] = useState<string>('')

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile()
      if (response.success === true) {
        setProfile(response.data)
        setStatusMessage(response.message)
      } else {
        console.log(response.message)
      }
    } catch {
      setStatusMessage('An error occurred during registration')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUserProfile()
  }, [])

  return (
    <div className='p-10 flex flex-col gap-4'>
      {profile ? (
        <>
          <span>{profile.username}</span>
          <span>{profile.email}</span>
        </>
      ) : (
        <Loader />
      )}
      <span className='text-blue-600'>{statusMessage}</span>
      <span className='text-green-800'>Token: {accessToken}</span>
      {userInfo ? (
        <>
          <span>User info:</span>
          <span>{userInfo.username}</span>
          <span>{userInfo.email}</span>
        </>
      ) : (
        <Loader />
      )}
    </div>
  )
}
