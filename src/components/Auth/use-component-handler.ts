import { TFormData } from './schema'
import { TMutationFn } from './types'
import { useDataMutation } from './use-data-mutation'

export const useComponentHandler = (fn: TMutationFn) => {
  const { isPending, mutate } = useDataMutation(fn)

  const handleSubmit = (data: TFormData) => {
    mutate(data)
  }

  return { isPending, handleSubmit }
}
