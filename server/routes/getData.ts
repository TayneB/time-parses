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

    Query = queryCharacterDetailsTEST(name, serverSlug, serverRegion)

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ Query }),
    })

    Query = queryCharacterParses(name, serverSlug, serverRegion, encounterId)

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
    console.log(ranks[0])

    //Query = (encounterId) => queryParsesBySpecAndDuration

    res.json(await response.json())
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
