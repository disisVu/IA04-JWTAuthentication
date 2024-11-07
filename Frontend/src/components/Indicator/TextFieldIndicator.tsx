interface TextFieldIndicatorProps {
  indicator: string
}

export function TextFieldIndicator({ indicator }: TextFieldIndicatorProps) {
  return <span className='ml-3 min-h-4 text-xs text-red-600'>{indicator}</span>
}
