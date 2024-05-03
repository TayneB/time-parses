import request from 'superagent'
import type { ParseData } from '../../models/filteredParseData.ts'
import type { Encounter } from '../../models/encounterData.ts'

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

export async function getEncounterDetails(): Promise<Encounter[]> {
  const { body } = await request.get(`${rootUrl}/encounters`).then((res) => res)
  return body
}

/* export async function getServerSlugs(): Promise<ServerSlugs> {
  const { data } = await request
    .get(`${rootUrl}/serverSlugs`)
    .then((res) => res.body)
  console.log(data)
  return data
} */
