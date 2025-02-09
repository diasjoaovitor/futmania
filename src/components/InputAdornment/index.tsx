import { ChangeEvent } from 'react'
import {
  FormControl,
  InputAdornment as MUIAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material'
import { handleFocus } from '@/utils'

type TInputAdornmentProps = {
  name: string
  label: string
  value: number
  color?: 'error' | 'primary'
  handleChange(e: ChangeEvent<HTMLInputElement>): void
}

export const InputAdornment = ({
  name,
  label,
  value,
  color,
  handleChange
}: TInputAdornmentProps) => {
  return (
    <FormControl fullWidth color={color}>
      <InputLabel htmlFor={name}>{label} *</InputLabel>
      <OutlinedInput
        role="textbox"
        id={name}
        name={name}
        type="number"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        startAdornment={<MUIAdornment position="start">R$</MUIAdornment>}
        label={label}
        required
      />
    </FormControl>
  )
}
