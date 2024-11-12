import { useEffect, useState } from 'react'
import { User } from '~/types/schema'
import { getUserProfile } from '~/api/userApi'
import { ProfileField } from '~/components/Field'
import { Loader } from '~/components/Loader/LoaderIndicator'
import { useSnackbar } from 'notistack'

export function ProfilePage() {
  const { enqueueSnackbar } = useSnackbar()
  const [profile, setProfile] = useState<User | undefined>(new User())
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile()
      if (response.success === true) {
        setProfile(response.data.user)
      }
      enqueueSnackbar(response.message, { variant: response.success ? 'success' : 'error' })
    } catch {
      enqueueSnackbar('Failed to fetch profile.', { variant: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUserProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) return <Loader />

  return (
    <div className='w-full min-h-[200vh] flex flex-col items-start gap-10'>
      <span className='text-4xl font-semibold'>Profile</span>
      <div className='w-full p-6 bg-white flex flex-col justify-start items-start gap-4 border shadow-md rounded-md'>
        <ProfileField label='Username' value={profile?.username} />
        <ProfileField label='Email' value={profile?.email} />
      </div>
    </div>
  )
}
