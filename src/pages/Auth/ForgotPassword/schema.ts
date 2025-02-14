import * as yup from 'yup'

export const schema = yup.object({
  email: yup.string().email('Email inválido').required('Email é obrigatório')
})

export type TFormData = yup.InferType<typeof schema>
