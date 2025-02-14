import * as yup from 'yup'

import { TSignInParams } from '@/interfaces'

export const schema: yup.ObjectSchema<TSignInParams> = yup.object({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatória')
})
