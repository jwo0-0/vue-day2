export type Deck = {
  id: number
  name: string
  tier: 'S' | 'A' | 'B' | 'C'
  level: number
  difficulty: 'Easy' | 'Normal' | 'Hard'
  avgRank: number
  winRate: number
  top4Rate: number
  pickRate: number
  cost: number
  traits: TraitBadge[]
  units: Unit[]
}

export type Unit = {
  name: string
  job: string
  image: string
  star?: 0 | 1 | 2 | 3
  rank?: '1st' | '2nd' | '3rd'
  cost?: 1 | 2 | 3 | 4 | 5
}

export type TraitBadge = {
  name: string
  count: number
}