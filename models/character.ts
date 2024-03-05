export interface Char {
  data: Data
}

export interface Data {
  characterData: CharacterData
}

export interface CharacterData {
  character: Character
}

export interface Character {
  id: number
  name: string
  level: number
}

export interface CharacterSearchDetails {
  name: string
  serverSlug: string
  serverRegion: string
}
