import { useCallback, useState } from 'react'
import { useParses } from '../hooks/useParses'
import ParseList from './ParseList'
import EncounterSelectOptions from './EncounterSelectOptions'

// NOTE: the encounterId MUST be from the current raid tier or it cant find results
// old raid tiers just time out because the data is not stored anymore
// using US as default because it's the first value to select
// Dragonflight season 4 has made this app function weirdly, it only works for the currently active awakened raid
// I'm not sure how it will work once all raids become awakened

function App() {
  const [name, setName] = useState('')
  const [serverSlug, setServerSlug] = useState('')
  const [serverRegion, setServerRegion] = useState('US')
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

  function sanitiseServerSlug(serverSlug: string) {
    return serverSlug.replace(/\s+/g, '-').replace(/'/g, '').toLowerCase()
  }

  const handleCallback = useCallback((firstEncounterId: number) => {
    setEncounterId(firstEncounterId)
  }, [])

  const { data, isLoading, isError, fetchStatus } = useParses(character)
  console.log(0)

  return (
    <>
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
            <div className="form-field">
              <label htmlFor="encounterId">Encounter: </label>
              <select
                id="encounterId"
                name="encounterId"
                value={encounterId}
                onChange={(e) => setEncounterId(Number(e.target.value))}
              >
                <EncounterSelectOptions handleCallback={handleCallback} />
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="serverRegion">Region: </label>
              <select
                id="serverRegion"
                name="serverRegion"
                value={serverRegion}
                onChange={(e) => setServerRegion(e.target.value)}
              >
                <option value="US">United States - OCE</option>
                <option value="EU">Europe</option>
                <option value="KR">Korea</option>
                <option value="TW">Taiwan</option>
                <option value="CN">China</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="serverSlug">Server: </label>
              <input
                id="serverSlug"
                type="text"
                name="name"
                onChange={(e) =>
                  setServerSlug(sanitiseServerSlug(e.target.value))
                }
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
          ) : data?.worldData?.encounter?.characterRankings?.rankings.length ===
            0 ? (
            <p className="search-status">No parses found for your time.</p>
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
