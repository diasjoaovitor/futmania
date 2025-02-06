import { useAppContext } from '@/contexts'

export const useComponentHandler = () => {
  const { users, babaId } = useAppContext()
  return { users, babaId }
}
