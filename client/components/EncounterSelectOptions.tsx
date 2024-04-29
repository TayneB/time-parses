import React from 'react'
import { useEncounterIds } from '../hooks/useParses'

const EncounterSelectOptions = () => {
  const { data, isLoading, isError, fetchStatus } = useEncounterIds()
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error...</p>
  return (
    <>
      {data[0].encounters.map((encounter, index) => (
        <option key={index} value={encounter.id}>
          {encounter.name}
        </option>
      ))}
    </>
  )
}

export default EncounterSelectOptions
