import { TFormData } from './schema'
import { useDataMutation } from './use-data-mutation'

export const useComponentHandler = () => {
  const { isPending, mutate } = useDataMutation()

  const handleSubmit = (data: TFormData) => {
    mutate(data)
  }

  return { isPending, handleSubmit }
}
