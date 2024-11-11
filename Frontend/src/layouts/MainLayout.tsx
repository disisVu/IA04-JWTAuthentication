import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import { colors } from '~/styles'

export function MainLayout() {
  return (
    <div style={{ color: colors.text_primary }} className='min-w-[100vw] flex flex-col justify-start items-center'>
      <Box
        sx={{
          width: {
            sm: '100%',
            lg: '1280px'
          }
        }}
        className='w-full py-5 px-5'
      >
        <Outlet />
      </Box>
    </div>
  )
}
