import { useEffect, useState } from 'react'
import { User } from '~/types/schema'
import { getUserProfile } from '~/api/userApi'
import { ProfileField } from '~/components/Field'
import { Loader } from '~/components/Loader/LoaderIndicator'

export function ProfilePage() {
  const [profile, setProfile] = useState<User | undefined>(new User())
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile()
      if (response.success === true) {
        setProfile(response.data)
      } else {
        console.log(response.message)
      }
    } catch {
      console.log('Failed to fetch user profile.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUserProfile()
  }, [])

  if (isLoading) return <Loader />

  return (
    <div className='w-full p-10 flex flex-col items-start gap-10'>
      <span className='text-4xl font-semibold'>Profile</span>
      <div className='w-full p-6 bg-white flex flex-col justify-start items-start gap-4 border shadow-md rounded-md'>
        <ProfileField label='Username' value={profile?.username} />
        <ProfileField label='Email' value={profile?.email} />
      </div>
    </div>
  )
}
