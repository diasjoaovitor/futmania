import { TMutationProps } from './types'
import { useDataMutation } from './use-data-mutation'

export const useComponentHandler = (props: TMutationProps) => {
  const { isPending, mutate } = useDataMutation(props)

  const handleSubmit = (data: any) => {
    mutate(data)
  }

  return { isPending, handleSubmit }
}
