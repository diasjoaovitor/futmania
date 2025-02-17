import {
  Button,
  ButtonProps,
  FormControl,
  TextField,
  TextFieldProps
} from '@mui/material'
import { Control, Controller } from 'react-hook-form'

import * as S from './styles'

type TInputWithButtonProps = {
  inputProps: TextFieldProps & { name: string; control: Control<any> }
  buttonProps: ButtonProps
}

export const InputWithButton = ({
  inputProps,
  buttonProps
}: TInputWithButtonProps) => {
  const { name, control, ...rest } = inputProps
  return (
    <FormControl sx={S.Wrapper}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => <TextField {...field} {...rest} />}
      />
      <Button {...buttonProps} />
    </FormControl>
  )
}
