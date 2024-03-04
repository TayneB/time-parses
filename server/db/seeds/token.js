/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('token').del()
  await knex('token').insert([
    { id: 1, access_token: '', expires_in: 0, expiration: 0 },
  ])
}
