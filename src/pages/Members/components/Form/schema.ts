import * as yup from 'yup'

export const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  isFixedMember: yup.boolean().required(),
  isGoalkeeper: yup.boolean().required()
})

export type TFormData = yup.InferType<typeof schema>
