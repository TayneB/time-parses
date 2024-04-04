export interface ParseData {
  data: Data
}

export interface Data {
  worldData: WorldData
}

export interface WorldData {
  encounter: Encounter
}

export interface Encounter {
  characterRankings: CharacterRankings
}

export interface CharacterRankings {
  page: number
  hasMorePages: boolean
  count: number
  rankings: Ranking[]
}

export interface Ranking {
  name: string
  class: string
  spec: string
  amount: number
  hardModeLevel: number
  duration: number
  startTime: number
  report: Report
  hidden?: boolean
  bracketData: number
  faction: number
  rank: number
  server?: Server
}

export interface Report {
  code: string
  fightID: number
  startTime: number
}

export interface Server {
  id: number
  name: string
  region: string
}
