import React from 'react'
import { useEncounterIds } from '../hooks/useParses'

const EncounterSelectOptions = () => {
  const { data, isLoading, isError, fetchStatus } = useEncounterIds()
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error...</p>
  return (
    <>
      <p>{data.at(1).name}</p>
    </>
  )
}

export default EncounterSelectOptions
