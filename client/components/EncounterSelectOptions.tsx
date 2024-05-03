import { useEffect, useState } from 'react'
import { useEncounterIds } from '../hooks/useParses'

const EncounterSelectOptions = ({
  handleCallback,
}: {
  handleCallback: (id: number) => void
}) => {
  const { data, isLoading, isError } = useEncounterIds()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!isLoading && !isError && data) {
      handleCallback(data[0].id)
      setIsInitialized(true)
    }
  }, [data, isLoading, isError, isInitialized]) // eslint-disable-line
  if (isLoading) return <option>Loading</option>
  if (isError) return <option>Error</option>
  console.log(data)
  return (
    <>
      {data.map((data: { id: number; name: string }, index: number) => (
        <option key={index} value={data.id}>
          {data.name}
        </option>
      ))}
    </>
  )
}

export default EncounterSelectOptions

// NOTE* We are intentionally not includeing handleCallback in the
// dependency array for useEffect, we are doing this because we
// only want to call handleCallback once, when the data is loaded
// becuase we want a reactive default state in the parent component
