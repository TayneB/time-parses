const queryExpansionIDs = `query {
	worldData {
		expansions  {
			name
			id
		}
	}
}`

const queryEncounterIDs = `query {
	worldData {
		expansion (id: 5)  {
			zones {
				encounters {
					name
					id
				}
			}
		}
	}
}`

const queryClassesAndSpecs = `query {
	gameData {
		classes {
			name
			slug
			specs {
				name
				slug
			}
		}
	}
}`

const queryParsesBySpecAndDuration = `query {
	worldData {
		encounter (id: 2709 ){
			characterRankings (className: "DeathKnight" specName: "Unholy" filter: "duration.200.300")
		}
	}
}`

const queryCharacterParses = `query {
	characterData {
		character(name: "Marbin", serverSlug: "frostmourne", serverRegion: "us") {
			encounterRankings(encounterID: 2709)
		}
	}
}`

const queryRegionAndServer = `query {
	worldData {
		regions {name slug servers(limit: 100 page: 1){
			data {name slug}
		}}
	}
}`

export {
  queryExpansionIDs,
  queryEncounterIDs,
  queryClassesAndSpecs,
  queryParsesBySpecAndDuration,
  queryRegionAndServer,
  queryCharacterParses,
}
