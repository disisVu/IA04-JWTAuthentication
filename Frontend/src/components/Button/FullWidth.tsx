import { Box } from '@mui/material'
import { colors } from '~/styles/index'
import { Loader } from '~/components/Loader/LoaderIndicator'

interface ButtonPrimaryProps {
  enabled: boolean
  text: string
  onClick: () => void
  isLoading?: boolean
}

export function ButtonPrimary({ enabled, text, onClick, isLoading = false }: ButtonPrimaryProps) {
  return (
    <Box
      className={`${enabled ? 'cursor-pointer' : ''} w-full max-h-12 mb-5 py-3 flex justify-center items-center rounded-xl`}
      sx={{
        backgroundColor: enabled ? colors.primary : colors.button_secondary,
        color: enabled ? '#fff' : colors.text_primary,
        ':hover': {
          filter: enabled ? 'brightness(105%)' : colors.button_secondary
        }
      }}
      onClick={onClick}
    >
      {isLoading ? <Loader /> : <span className='text-sm font-semibold'>{text}</span>}
    </Box>
  )
}
