import { TextFieldProps } from '@mui/material'

import { TSignInParams, TSignUpParams } from '@/interfaces'

export type TAuthFormInput = TextFieldProps & { name: string }

export type TMutationFn = (
  params: TSignInParams | TSignUpParams
) => Promise<void>
