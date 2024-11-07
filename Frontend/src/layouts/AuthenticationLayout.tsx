import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import { colors } from '~/styles'

export function AuthenticationLayout() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: colors.gradient
      }}
      className='flex justify-center items-center'
    >
      <Outlet />
    </Box>
  )
}
