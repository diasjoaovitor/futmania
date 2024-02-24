import {
  Button,
  ButtonProps,
  FormControl,
  TextField,
  TextFieldProps
} from '@mui/material'
import * as S from './style'

type Props = {
  inputProps: TextFieldProps
  buttonProps: ButtonProps
}

export function InputWithButton({ inputProps, buttonProps }: Props) {
  return (
    <FormControl sx={S.Wrapper}>
      <TextField {...inputProps} />
      <Button {...buttonProps} />
    </FormControl>
  )
}
