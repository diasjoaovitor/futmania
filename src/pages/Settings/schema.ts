import * as yup from 'yup'

import { TUserModel } from '@/models'

export const schema: yup.ObjectSchema<Pick<TUserModel, 'displayName'>> =
  yup.object({
    displayName: yup.string().required('Nome do Baba é obrigatório')
  })

export type TFormData = yup.InferType<typeof schema>
