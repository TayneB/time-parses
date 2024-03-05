import { useQuery } from '@tanstack/react-query'
import { getCharacterData } from '../apis/parses'

export function useParses() {
  const query = useQuery({ queryKey: ['parses'], queryFn: getCharacterData })
  return { ...query }
}
