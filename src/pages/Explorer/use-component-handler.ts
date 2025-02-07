import { useAppContext } from '@/contexts'

export const useComponentHandler = () => {
  const { users, babaUser } = useAppContext()
  return { users, babaId: babaUser?.id }
}
