export interface Empty {
  data: Data
}

export interface Data {
  characterData: CharacterData
}

export interface CharacterData {
  character: Character
}

export interface Character {
  encounterRankings: EncounterRankings
}

export interface EncounterRankings {
  bestAmount: number
  medianPerformance: number
  averagePerformance: number
  totalKills: number
  fastestKill: number
  difficulty: number
  metric: string
  partition: number
  zone: number
  ranks: Rank[]
}

export interface Rank {
  lockedIn: boolean
  rankPercent: number
  historicalPercent: number
  todayPercent: number
  rankTotalParses: number
  historicalTotalParses: number
  todayTotalParses: number
  guild: Guild
  report: Report
  duration: number
  startTime: number
  amount: number
  bracketData: number
  spec: Spec
  bestSpec: Spec
  class: number
  faction: number
}

export enum Spec {
  Unholy = 'Unholy',
}

export interface Guild {
  id: null
  name: null
  faction: null
}

export interface Report {
  code: string
  startTime: number
  fightID: number
}
