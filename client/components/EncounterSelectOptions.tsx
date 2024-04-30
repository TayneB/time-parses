import React, { useEffect, useState } from 'react'
import { useEncounterIds } from '../hooks/useParses'

const EncounterSelectOptions = ({
  handleCallback,
}: {
  handleCallback: (id: number) => void
}) => {
  const { data, isLoading, isError } = useEncounterIds()

  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (
      !isLoading &&
      !isError &&
      data &&
      data[2] &&
      data[2].encounters.length > 0
    ) {
      handleCallback(data[2].encounters[0].id)
      setIsInitialized(true)
    }
  }, [data, isLoading, isError, isInitialized]) // eslint-disable-line
  if (isLoading) return <option>Loading</option>
  if (isError) return <option>Error</option>
  return (
    <>
      {data[2].encounters.map(
        (encounter: { id: number; name: string }, index: number) => (
          <option key={index} value={encounter.id}>
            {encounter.name}
          </option>
        )
      )}
    </>
  )
}

export default EncounterSelectOptions
