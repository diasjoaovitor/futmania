import {
  Button,
  ButtonProps,
  FormControl,
  TextField,
  TextFieldProps
} from '@mui/material'
import * as S from './styles'

type TInputWithButtonProps = {
  inputProps: TextFieldProps
  buttonProps: ButtonProps
}

export const InputWithButton = ({
  inputProps,
  buttonProps
}: TInputWithButtonProps) => {
  return (
    <FormControl sx={S.Wrapper}>
      <TextField {...inputProps} />
      <Button {...buttonProps} />
    </FormControl>
  )
}
