import { Box } from '@mui/material'
import { useLogout } from '~/hooks'
import { colors } from '~/styles'

export function NavBar() {
  const { handleLogout } = useLogout()

  return (
    <Box
      sx={{ width: '100vw', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
      className='sticky z-20 top-0 h-16 pl-6 pr-10 py-3 bg-white flex flex-row justify-between items-center gap-4'
    >
      <span style={{ color: colors.primary }} className='font-medium'>
        IA04 - JWT Authentication
      </span>
      <Box
        sx={{ backgroundColor: colors.primary }}
        className='cursor-pointer px-4 py-2 rounded-md'
        onClick={handleLogout}
      >
        <span className='text-white font-medium'>Log Out</span>
      </Box>
    </Box>
  )
}
