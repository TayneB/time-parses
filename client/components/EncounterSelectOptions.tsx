import React from 'react'
import { useEncounterIds } from '../hooks/useParses'

const EncounterSelectOptions = () => {
  const { data, isLoading, isError, fetchStatus } = useEncounterIds()
  if (isLoading) return <option>Loading</option>
  if (isError) return <option>Error</option>
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
