import express from 'express'
import dotenv from 'dotenv'
import { getToken, updateToken } from '../db/functions/token'
import {
  queryExpansionIDs,
  queryEncounterIDs,
  queryClassesAndSpecs,
  queryParsesBySpecAndDuration,
  queryRegionAndServer,
  queryCharacterParses,
  queryCharacterDetailsTEST,
} from './queries/queries'

dotenv.config()
const router = express.Router()

interface QueryParams {
  name: string
  serverSlug: string
  serverRegion: string
  encounterId: number
}

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const clientCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
  'base64'
)

const apiUrl = 'https://www.warcraftlogs.com/api/v2/client'
const tokenUrl = 'https://www.warcraftlogs.com/oauth/token'

// GET /api/v1/data
router.get('/', async (req, res) => {
  try {
    const { access_token, expiration } = await getToken()
    const { name, serverSlug, serverRegion, encounterId } = req.query

    if (!name || !serverSlug || !serverRegion || !encounterId) {
      throw new Error('Missing or invalid query parameters')
    }

    const queryParams: QueryParams = {
      name: name as string,
      serverSlug: serverSlug as string,
      serverRegion: serverRegion as string,
      encounterId: Number(encounterId) as number,
    }

    console.log(name, serverSlug, serverRegion, encounterId)

    let token = ''
    let Query = null

    if (expiration < new Date().getTime() || access_token === '') {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
          Authorization: `Basic ${clientCredentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      const data = await response.json()
      await updateToken(data)
      token = data.access_token
    } else {
      token = access_token
    }

    Query = queryCharacterDetailsTEST(
      queryParams.name,
      queryParams.serverSlug,
      queryParams.serverRegion
    )

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ Query }),
    })

    Query = queryCharacterParses(
      queryParams.name,
      queryParams.serverSlug,
      queryParams.serverRegion,
      queryParams.encounterId
    )

    const characterParses = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ Query }),
    })

    const characterData = await characterParses.json()

    const ranks =
      characterData.data.characterData.character.encounterRankings.ranks
    ranks.sort(
      (a: { startTime: number }, b: { startTime: number }) =>
        b.startTime - a.startTime
    )
    console.log(ranks[0].spec, ranks[0].class, ranks[0].duration)

    const { spec, duration } = await ranks[0]

    const minDuration = duration / 1000 - 20
    const maxDuration = duration / 1000 + 20

    Query = queryClassesAndSpecs()

    const classesAndSpecsData = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ Query }),
    })

    const classesAndSpecs = await classesAndSpecsData.json()
    const className = classesAndSpecs.data.gameData.classes.find(
      (classObj: { id: number }) => classObj.id === ranks[0].class
    )?.slug

    Query = queryParsesBySpecAndDuration(
      queryParams.encounterId,
      className,
      spec,
      minDuration,
      maxDuration
    )

    const reccomendedParsesData = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ Query }),
    })

    const reccomendedParses = await reccomendedParsesData.json()
    console.log(reccomendedParses.data.worldData.encounter.characterRankings)

    res.json(reccomendedParses)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
