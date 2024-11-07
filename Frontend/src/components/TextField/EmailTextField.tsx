import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { FieldError } from 'react-hook-form'
import { TextFieldIndicator } from '~/components/Indicator'
import { colors } from '~/styles'

interface EmailTextFieldProps {
  value: string
  onChange: (value: string) => void
  indicator: string
  error: FieldError
  autoComplete?: string
}

export function EmailTextField({ value, onChange, indicator, error, autoComplete = 'email' }: EmailTextFieldProps) {
  return (
    <div className='w-full flex flex-col items-start gap-1'>
      <FormControl sx={{ width: '100%' }} variant='outlined'>
        <InputLabel htmlFor='outlined-adornment-email' sx={{ color: indicator === '' ? colors.text_primary : '#f00' }}>
          Email
        </InputLabel>
        <OutlinedInput
          id='outlined-adornment-email'
          label='Email'
          placeholder='Enter email here'
          sx={{
            '& .MuiOutlinedInput-root': {
              fontSize: '14px',
              height: '56px',
              padding: '0 12px',
              borderRadius: '8px',
              color: colors.text_primary,
              '& input': {
                paddingLeft: '2px'
              }
            },
            '& .MuiInputLabel-root': {
              color: indicator === '' ? colors.text_primary : '#f00'
            },
            '& fieldset': {
              borderColor: indicator === '' ? colors.border : '#f00'
            }
          }}
          className='w-full'
          startAdornment={
            <InputAdornment position='start'>
              <FontAwesomeIcon icon={faEnvelope} style={{ marginBottom: '1px' }} className='text-lg' />
            </InputAdornment>
          }
          value={value}
          onChange={(e) => onChange(e.target.value)}
          error={!!error}
          autoComplete={autoComplete}
        />
      </FormControl>
      <TextFieldIndicator indicator={indicator} color={!error ? '#0f0' : undefined} />
    </div>
  )
}
