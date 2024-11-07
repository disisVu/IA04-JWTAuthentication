import React from 'react'

import { Box } from '@mui/material'

interface PrimaryModalProps {
  isOpen: boolean
  children: React.ReactNode
}

export function PrimaryModal({ isOpen, children }: PrimaryModalProps) {
  if (!isOpen) return null

  return (
    <Box
      sx={{
        width: {
          xs: '100%',
          md: '640px'
        },
        background: '#ffffff'
      }}
      className='px-20 py-16 flex flex-col justify-center items-center rounded-xl shadow-lg'
    >
      {children}
    </Box>
  )
}
