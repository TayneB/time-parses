import { useState } from 'react'
import { useParses } from '../hooks/useParses'
import ParseList from './ParseList'

function App() {
  const [name, setName] = useState('Marbin')
  const [serverSlug, setServerSlug] = useState('frostmourne')
  const [serverRegion, setServerRegion] = useState('us')
  const [encounterId, setEncounterId] = useState(2709)

  const [character, setCharacter] = useState({
    name: name,
    serverSlug: serverSlug,
    serverRegion: serverRegion,
    encounterId: encounterId,
  })

  function onClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setCharacter({
      name: name,
      serverSlug: serverSlug,
      serverRegion: serverRegion,
      encounterId: encounterId,
    })
  }

  const { data, isLoading, isError } = useParses(character)

  if (isError) {
    return <p>Something went wrong...</p>
  }

  if (!data || isLoading) {
    return <p>Loading...</p>
  }

  console.log(data.worldData)

  return (
    <>
      <header className="header">
        <h1>{name}</h1>
      </header>
      <section className="main">
        Level: {} - Id: {}
      </section>
      <form onSubmit={onClick}>
        <label htmlFor="name">Character: </label>
        <input
          id="name"
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="serverSlug">Server: </label>
        <input
          id="serverSlug"
          type="text"
          name="serverSlug"
          onChange={(e) => setServerSlug(e.target.value)}
        />
        <label htmlFor="serverRegion">Region: </label>
        <input
          id="serverRegion"
          type="text"
          name="serverRegion"
          onChange={(e) => setServerRegion(e.target.value)}
        />
        <label htmlFor="serverRegion">EncounterId: </label>
        <input
          id="encounterId"
          type="text"
          name="encounterId"
          onChange={(e) => setEncounterId(Number(e.target.value))}
        />
        <button type="submit">Find</button>
      </form>
      {data.worldData.encounter.characterRankings.rankings.map(function (
        ranking
      ) {
        return (
          <ParseList
            key={ranking.amount}
            name={ranking.name}
            spec={ranking.spec}
            duration={ranking.duration}
            amount={ranking.amount}
            ilvl={ranking.bracketData}
            code={ranking.report.code}
            fightID={ranking.report.fightID}
          />
        )
      })}
    </>
  )
}

export default App
