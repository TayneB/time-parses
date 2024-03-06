import { useParses } from '../hooks/useParses'

function App() {
  const character = {
    name: 'Marbin',
    serverSlug: 'frostmourne',
    serverRegion: 'us',
  }
  const { data, isLoading, isError } = useParses(character)

  if (isError) {
    return <p>Something went wrong...</p>
  }

  if (!data || isLoading) {
    return <p>Loading...</p>
  }

  console.log(data.character)

  return (
    <>
      <header className="header">
        <h1>{data.character.name}</h1>
      </header>
      <section className="main">
        Level: {data.character.level} - Id: {data.character.id}
      </section>
    </>
  )
}

export default App
