import * as yup from 'yup'

import { TFinanceType } from '@/models'

export const schema = yup.object({
  type: yup
    .string()
    .required('Tipo de lançamento é obrigatório')
    .oneOf(
      ['+', '-'] as TFinanceType[],
      'Tipo de lançamento deve ser "+" ou "-"'
    ),
  description: yup.string().required(),
  value: yup
    .string()
    .required('Valor é obrigatório')
    .test('isPositive', 'Valor deve ser maior que zero', (value) => {
      const number = value.replace(/[^\d]/g, '')
      return parseInt(number) > 0
    }),
  date: yup
    .string()
    .required('Data é obrigatória')
    .test('isDate', 'Data inválida', (value) => {
      return !isNaN(Date.parse(value))
    })
})

export type TFormData = yup.InferType<typeof schema>
