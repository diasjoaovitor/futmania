import { TextFieldProps } from '@mui/material'

export type TAuthFormInput = TextFieldProps & { name: string }

export type TMutationProps = {
  fn: (params: any) => Promise<void>
  errorMessage: string
}
