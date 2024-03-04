import { tokenData } from '../../../models/tokenData'
import db from '../connection'

// getToken
export async function getToken(): Promise<tokenData[]> {
  const result = await db('token').select('*').where({ id: 1 }).first()
  return result
}
