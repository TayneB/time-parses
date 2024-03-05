import request from 'superagent'
import type { Character } from '../../models/character.ts'

const rootUrl = '/api/v1/getData'

export async function getCharacterData(
  name: string,
  serverSlug: string,
  serverRegion: string
): Promise<Character> {
  const { character } = await request
    .get(rootUrl)
    .send({ name: name, serverSlug: serverSlug, serverRegion: serverRegion })
    .then((res) => res.body.data.characterData)
  return character
}
