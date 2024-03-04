import express from 'express'
import dotenv from 'dotenv'
import { getToken } from '../db/functions/token'

dotenv.config({ path: '../../../.env' })
const router = express.Router()

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const clientCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
  'base64'
)

const tokenUrl = 'https://www.warcraftlogs.com/oauth/token'

// GET /api/v1/token
router.get('/token', async (req, res) => {
  try {
    const { access_token, expiration } = await getToken()

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
      res.json(data.access_token)
    }

    res.json(access_token)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
