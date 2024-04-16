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

  console.log('TEST DATA STILL PRESENT')

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
      <div className="centered">
        <form onSubmit={onClick}>
          <div className="form-container">
            <div className="form-field">
              <label htmlFor="name">Character: </label>
              <input
                id="name"
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="serverSlug">Server: </label>
              <input
                id="serverSlug"
                type="text"
                name="serverSlug"
                onChange={(e) => setServerSlug(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="serverRegion">Region: </label>
              <input
                id="serverRegion"
                type="text"
                name="serverRegion"
                onChange={(e) => setServerRegion(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="serverRegion">EncounterId: </label>
              <input
                id="encounterId"
                type="text"
                name="encounterId"
                onChange={(e) => setEncounterId(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="form-button">
            <button type="submit">Find</button>
          </div>
        </form>
        <div className="parse-list">
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
        </div>
      </div>
    </>
  )
}

export default App
