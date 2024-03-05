import request from 'superagent'
import type { Character } from '../../models/character.ts'

const rootUrl = '/api/v1/getData'

export async function getCharacterData(): Promise<Character> {
  // name: string,
  // serverSlug: string,
  // serverRegion: string
  const { character } = await request
    .get(rootUrl)
    .send({ name: 'Marbin', serverSlug: 'frostmourne', serverRegion: 'us' })
    .then((res) => res.body.data.characterData)
  return character
}

// const name = 'Marbin'
// const serverSlug = 'frostmourne'
// const serverRegion = 'us'
