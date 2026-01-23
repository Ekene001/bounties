export type BountyType = "feature" | "bug" | "documentation" | "refactor" | "other"

export type BountyStatus = "open" | "claimed" | "closed"

export type DifficultyLevel = "easy" | "medium" | "hard"

export interface BountyProject {
  name: string
  logo?: string
  url?: string
}

export interface BountyGitHub {
  repoUrl: string
  issueUrl: string
  issueNumber: number
}

export interface BountyReward {
  amount: number
  currency: string
}

export interface BountyDetails {
  id: string
  type: BountyType
  title: string
  project: BountyProject
  github: BountyGitHub
  description: string
  requirements?: string[]
  scope?: string
  reward: BountyReward
  difficulty: DifficultyLevel
  tags: string[]
  status: BountyStatus
  createdAt: string
  updatedAt: string
}
