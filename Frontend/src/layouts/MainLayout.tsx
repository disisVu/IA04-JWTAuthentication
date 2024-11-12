import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import { NavBar } from '~/components/Header'
import { colors } from '~/styles'

export function MainLayout() {
  return (
    <div style={{ color: colors.text_primary }} className='min-w-[100vw] flex flex-col justify-start items-center'>
      <NavBar />
      <Box
        sx={{
          width: {
            sm: '100%',
            lg: '1280px'
          }
        }}
        className='w-full px-10 lg:px-0 py-10'
      >
        <Outlet />
      </Box>
    </div>
  )
}
