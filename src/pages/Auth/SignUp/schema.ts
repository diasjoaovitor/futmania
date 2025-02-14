import * as yup from 'yup'

import { TSignUpParams } from '@/interfaces'

export const schema: yup.ObjectSchema<TSignUpParams> = yup.object({
  displayName: yup.string().required('Nome do Baba é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatória')
})
