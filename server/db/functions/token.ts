import { tokenData } from '../../../models/tokenData'
import db from '../connection'

// getToken
export async function getToken(): Promise<tokenData> {
  const result = await db('token').select('*').where({ id: 1 }).first()
  return result
}

// updateToken
export async function updateToken(data: {
  token_type: string
  expires_in: number
  access_token: string
}): Promise<string> {
  await db('token')
    .select('*')
    .where({ id: 1 })
    .update({
      expires_in: data.expires_in,
      expiration: new Date().getTime() + data.expires_in * 1000,
      access_token: data.access_token,
    })
  return 'Token updated successfully!'
}
