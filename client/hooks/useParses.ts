import { useQuery } from '@tanstack/react-query'
import { getCharacterData } from '../apis/parses'

export function useParses(character: {
  name: string
  serverSlug: string
  serverRegion: string
  encounterId: number
}) {
  const query = useQuery({
    queryKey: ['parses', character],
    queryFn: () => getCharacterData(character),
  })
  return { ...query }
}
