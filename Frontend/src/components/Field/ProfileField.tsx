import { colors } from '~/styles'

interface ProfileFieldProps {
  label: string
  value: string | undefined
}

export function ProfileField({ label, value }: ProfileFieldProps) {
  return (
    <div className='w-full grid grid-row md:grid-cols-12 items-center'>
      <span style={{ color: colors.text_secondary }} className='col-span-2 flex justify-start'>
        {label}
      </span>
      <div
        style={{ backgroundColor: colors.button_secondary }}
        className='col-span-10 rounded-md px-4 py-2 flex items-center'
      >
        <span>{value}</span>
      </div>
    </div>
  )
}
