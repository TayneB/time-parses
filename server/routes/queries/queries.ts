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

export { queryExpansionIDs, queryEncounterIDs }
