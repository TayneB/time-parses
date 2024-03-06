import request from 'superagent'
import type { CharacterData } from '../../models/character.ts'

const rootUrl = '/api/v1/getData'

export async function getCharacterData(character: {
  name: string
  serverSlug: string
  serverRegion: string
}): Promise<CharacterData> {
  const { characterData } = await request
    .get(rootUrl)
    .query({
      name: character.name,
      serverSlug: character.serverSlug,
      serverRegion: character.serverRegion,
    })
    .then((res) => res.body.data)
  return characterData
}
