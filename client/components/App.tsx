import { useParses } from '../hooks/useParses'

function App() {
  // const name = 'Marbin'
  // const serverSlug = 'frostmourne'
  // const serverRegion = 'us'
  const { data, isLoading, isError } = useParses()

  if (isError) {
    return <p>Something went wrong...</p>
  }

  if (!data || isLoading) {
    return <p>Loading...</p>
  }

  console.log(data)

  return (
    <>
      <header className="header">
        <h1>{data.name}</h1>
      </header>
      <section className="main">
        Level: {data.level} - Id: {data.id}
      </section>
    </>
  )
}

export default App
