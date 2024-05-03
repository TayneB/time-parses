import { useQuery } from '@tanstack/react-query'
import {
  getCharacterData,
  getEncounterDetails,
  /* getServerSlugs, */
} from '../apis/parses'

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
    staleTime: Infinity,
    cacheTime: Infinity,
  })
  return { ...query }
}

export function useEncounterIds() {
  const query = useQuery({
    queryKey: ['encounterDetails'],
    queryFn: () => getEncounterDetails(),
    staleTime: Infinity,
    cacheTime: Infinity,
  })
  return { ...query }
}

/* export function useServerSlugs() {
  const query = useQuery({
    queryKey: ['serverSlugs'],
    queryFn: () => getServerSlugs(),
  })
  return { ...query }
} */
