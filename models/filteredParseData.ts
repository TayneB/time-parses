export interface ParseData {
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
  class: Class
  spec: Spec
  amount: number
  hardModeLevel: number
  duration: number
  startTime: number
  report: Report
  guild?: Guild
  server?: Server
  bracketData: number
  faction: number
  rank: number
  hidden?: boolean
}

export enum Class {
  DeathKnight = 'DeathKnight',
}

export interface Guild {
  id: number
  name: string
  faction: number
}

export interface Report {
  code: string
  fightID: number
  startTime: number
}

export interface Server {
  id: number
  name: string
  region: Region
}

export enum Region {
  Eu = 'EU',
  Kr = 'KR',
  Us = 'US',
}

export enum Spec {
  Unholy = 'Unholy',
}
