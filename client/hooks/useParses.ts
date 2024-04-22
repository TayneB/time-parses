import { useQuery } from '@tanstack/react-query'
import { getCharacterData } from '../apis/parses'

export function useParses(character: {
  name: string
  serverSlug: string
  serverRegion: string
  encounterId: number
}) {
  const characterValid =
    character &&
    character.name != '' &&
    character.serverSlug != '' &&
    character.serverRegion != '' &&
    typeof character.encounterId === 'number'

  const query = useQuery({
    queryKey: ['parses', character],
    queryFn: () => getCharacterData(character),
    enabled: characterValid,
  })
  return { ...query }
}
