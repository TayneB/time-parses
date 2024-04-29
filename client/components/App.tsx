import { useState } from 'react'
import { useParses } from '../hooks/useParses'
import ParseList from './ParseList'
import EncounterSelectOptions from './EncounterSelectOptions'

// NOTE: the encounterId MUST be from the current raid tier or it cant find results
// old raid tiers just time out because the data is not stored anymore

function App() {
  const [name, setName] = useState('')
  const [serverSlug, setServerSlug] = useState('')
  const [serverRegion, setServerRegion] = useState('')
  const [encounterId, setEncounterId] = useState(0)

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

  {
    /* <select
                id="serverSlug"
                name="serverSlug"
                onChange={(e) => setServerSlug(e.target.value)}
              >
                <option value="frostmourne">Volvo</option>
              </select> */
  }

  const { data, isLoading, isError, fetchStatus } = useParses(character)

  return (
    <>
      <EncounterSelectOptions />
      <div className="centered">
        <form onSubmit={onClick}>
          <div className="form-container">
            <div className="form-field">
              <label htmlFor="name">Character Name: </label>
              <input
                id="name"
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* <div className="form-field">
              <label htmlFor="serverSlug">Server: </label>
              <select
                id="serverSlug"
                name="serverSlug"
                value={serverSlug}
                onChange={(e) => setServerSlug(e.target.value)}
              >
                <option value="frostmourne">frostmourne</option>
                <option value="frne">Frourne</option>
              </select>
            </div> */}
            <div className="form-field">
              <label htmlFor="serverSlug">Server: </label>
              <input
                id="serverSlug"
                type="text"
                name="name"
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
          {isError ? (
            <p className="search-status">
              Couldn&apos;t find that character...
            </p>
          ) : fetchStatus === 'idle' && !data ? (
            <p className="search-status">Please Add Your Character Details!</p>
          ) : !data || isLoading ? (
            <p className="search-status">Loading...</p>
          ) : (
            data?.worldData?.encounter?.characterRankings?.rankings?.map(
              (ranking) => (
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
            )
          )}
        </div>
      </div>
    </>
  )
}

export default App
