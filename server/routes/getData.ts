import express from 'express'
import dotenv from 'dotenv'
import { getToken, updateToken } from '../db/functions/token'

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
    // const { name, serverSlug, serverRegion } = req.query
    const name = 'Marbin'
    const serverSlug = 'frostmourne'
    const serverRegion = 'us'

    let token = ''

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

    // potential issue with extra "" quotation marks in the query
    const Query = `
    query {
      characterData {
        character(name: "${name}", serverSlug: "${serverSlug}", serverRegion: "${serverRegion}") {
          id
          name
          level
        }
      }
    }
  `

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ Query }),
    })
    res.json(await response.json())
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
