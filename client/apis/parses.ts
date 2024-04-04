import request from 'superagent'
import type { ParseData } from '../../models/filteredParseData.ts'
import type { CharacterData } from '../../models/character.ts'

const rootUrl = '/api/v1/getData'

export async function getCharacterData(character: {
  name: string
  serverSlug: string
  serverRegion: string
  encounterId: number
}): Promise<ParseData> {
  const { data } = await request
    .get(rootUrl)
    .query({
      name: character.name,
      serverSlug: character.serverSlug,
      serverRegion: character.serverRegion,
      encounterId: character.encounterId,
    })
    .then((res) => res.body)
  console.log(data)
  return data
}
