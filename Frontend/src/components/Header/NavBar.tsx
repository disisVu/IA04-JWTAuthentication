import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useHover, useLogout } from '~/hooks'
import { colors } from '~/styles'

export function NavBar() {
  const navigate = useNavigate()
  const { handleLogout } = useLogout()

  const navigateToHome = () => {
    navigate('/')
  }

  return (
    <Box
      sx={{ width: '100vw', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
      className='sticky z-20 top-0 h-16 pl-6 pr-10 py-3 bg-white flex flex-row justify-between items-center gap-4'
    >
      <span style={{ color: colors.primary }} className='cursor-pointer font-medium' onClick={navigateToHome}>
        IA04 - JWT Authentication
      </span>
      <Box className='flex flex-row items-center gap-10'>
        <NavBarHyperlink label='Profile' route='/profile' />
        {/* Logout button */}
        <Box
          sx={{ backgroundColor: colors.primary }}
          className='cursor-pointer px-4 py-2 rounded-md'
          onClick={handleLogout}
        >
          <span className='text-white font-medium'>Log Out</span>
        </Box>
      </Box>
    </Box>
  )
}

interface NavBarHyperlinkProps {
  label: string
  route: string
}

function NavBarHyperlink({ label, route }: NavBarHyperlinkProps) {
  const navigate = useNavigate()
  const { isHovered, onMouseEnter, onMouseLeave } = useHover()

  const navigateToRoute = () => {
    navigate(route)
  }

  return (
    <span
      style={{ color: isHovered ? colors.primary : colors.text_secondary }}
      className='cursor-pointer font-medium'
      onClick={navigateToRoute}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {label}
    </span>
  )
}
