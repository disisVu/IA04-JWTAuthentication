import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'

import { useToggle } from '~/hooks'
import { TextFieldIndicator } from '~/components/Indicator'
import { colors } from '~/styles'
import { FieldError } from 'react-hook-form'

interface PasswordTextFieldProps {
  value: string
  onChange: (value: string) => void
  indicator: string
  error: FieldError
  label?: string
  placeholder?: string
  autoComplete?: string
}

export function PasswordTextField({
  value,
  onChange,
  indicator,
  error,
  label = 'Password',
  placeholder = 'Enter password here',
  autoComplete = 'password'
}: PasswordTextFieldProps) {
  const { value: showPassword, toggle: toggleShowPassword } = useToggle(false)

  return (
    <div className='w-full flex flex-col items-start gap-1'>
      <FormControl sx={{ width: '100%' }} variant='outlined'>
        <InputLabel
          htmlFor={`outlined-adornment-${label}`}
          sx={{ color: indicator === '' ? colors.text_primary : '#f00' }}
        >
          {label}
        </InputLabel>
        <OutlinedInput
          id={`outlined-adornment-${label}`}
          required
          label={label}
          placeholder={placeholder}
          type={showPassword ? 'text' : 'password'}
          sx={{
            fontSize: '14px',
            height: '56px',
            padding: '0px 12px',
            borderRadius: '8px',
            color: colors.text_primary,
            '& .MuiOutlinedInput-input': {
              paddingLeft: '2px'
            },
            '& fieldset': {
              borderColor: indicator === '' ? colors.border : '#f00'
            }
          }}
          startAdornment={
            <InputAdornment position='start'>
              <FontAwesomeIcon icon={faLock} className='text-lg mb-1' />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label={showPassword ? 'hide the password' : 'display the password'}
                onClick={toggleShowPassword}
                edge='end'
                disableRipple
                disableFocusRipple
                sx={{
                  '&:focus': {
                    outline: 'none'
                  }
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          value={value}
          onChange={(e) => onChange(e.target.value)}
          error={!!error}
          autoComplete={autoComplete}
        />
      </FormControl>
      <TextFieldIndicator indicator={error ? indicator : 'Valid'} color={error ? undefined : colors.valid} />
    </div>
  )
}
