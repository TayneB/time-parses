const queryExpansionIDs = () => `query {
	worldData {
		expansions  {
			name
			id
		}
	}
}`

const queryEncounterIDs = () => `query {
	worldData {
		expansion (id: 5)  {
			zones {
				name
				encounters {
					name
					id
				}
			}
		}
	}
}`

const queryClassesAndSpecs = () => `query {
	gameData {
		classes {
			name
			slug
      id
			specs {
				name
				slug
			}
		}
	}
}`

const queryParsesBySpecAndDuration = (
  encounterId: number,
  className: string,
  spec: string,
  minDuration: number,
  maxDuration: number
) => `query {
	worldData {
		encounter (id: ${encounterId} ){
			characterRankings (className: "${className}" specName: "${spec}" filter: "duration.${minDuration}.${maxDuration}")
		}
	}
}`

const queryCharacterParses = (
  name: string,
  serverSlug: string,
  serverRegion: string,
  encounterId: number
) => `query {
	characterData {
		character(name: "${name}", serverSlug: "${serverSlug}", serverRegion: "${serverRegion}") {
			encounterRankings(encounterID: ${encounterId})
		}
	}
}`

const queryRegionAndServer = () => `query {
	worldData {
		regions {name slug servers(limit: 100 page: 1){
			data {name slug}
		}}
	}
}`

const queryCharacterDetailsTEST = (
  name: string,
  serverSlug: string,
  serverRegion: string
) => `
    query {
      characterData {
        character(name: "${name}", serverSlug: "${serverSlug}", serverRegion: "${serverRegion}") {
          id
          name
          level
        }
      }
    }
  `

export {
  queryExpansionIDs,
  queryEncounterIDs,
  queryClassesAndSpecs,
  queryParsesBySpecAndDuration,
  queryRegionAndServer,
  queryCharacterParses,
  queryCharacterDetailsTEST,
}
