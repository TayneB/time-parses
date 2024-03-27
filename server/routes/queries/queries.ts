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

export { queryExpansionIDs, queryEncounterIDs, queryClassesAndSpecs }
