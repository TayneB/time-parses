import request from 'superagent'
import type { Character } from '../../models/character.ts'

const rootUrl = '/api/v1/getData'

export async function getCharacterData(): Promise<Character> {
  const { character } = await request
    .get(rootUrl)
    .then((res) => res.body.data.characterData)
  return character
}
