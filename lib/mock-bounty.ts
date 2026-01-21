import { BountyDetails } from "@/types/bounty"

export const mockBounties: BountyDetails[] = [
  {
    id: "1",
    type: "bug",
    title: "Fix authentication redirect loop on Safari",
    project: {
      name: "Boundless Finance",
      logo: "/logo.svg",
      url: "https://boundless.fi",
    },
    github: {
      repoUrl: "https://github.com/boundlessfi/bounties",
      issueUrl: "https://github.com/boundlessfi/bounties/issues/1",
      issueNumber: 1,
    },
    description: `## Problem
Users on Safari are experiencing an infinite redirect loop when attempting to authenticate via GitHub OAuth.

## Steps to Reproduce
1. Open Safari browser
2. Navigate to the login page
3. Click "Sign in with GitHub"
4. After GitHub authorization, observe the redirect loop

## Expected Behavior
User should be redirected to the dashboard after successful authentication.

## Technical Notes
The issue appears to be related to cookie handling in Safari's strict privacy mode.`,
    requirements: [
      "Fix must work on Safari 16+",
      "Must not break existing Chrome/Firefox functionality",
      "Include unit tests for the fix",
      "Update documentation if needed",
    ],
    scope: "Authentication module only. Do not modify unrelated components.",
    reward: { amount: 500, currency: "USDC" },
    difficulty: "medium",
    tags: ["safari", "authentication", "oauth", "cookies"],
    status: "open",
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-18T14:30:00Z",
  },
  {
    id: "2",
    type: "feature",
    title: "Implement dark mode toggle in settings",
    project: {
      name: "Boundless Finance",
      logo: "/logo.svg",
      url: "https://boundless.fi",
    },
    github: {
      repoUrl: "https://github.com/boundlessfi/bounties",
      issueUrl: "https://github.com/boundlessfi/bounties/issues/2",
      issueNumber: 2,
    },
    description: `## Feature Request
Add a dark mode toggle to the application settings page that persists user preference.

## Requirements
- Toggle switch in settings
- Persist preference in localStorage
- Respect system preference as default
- Smooth transition between themes`,
    requirements: [
      "Use next-themes for implementation",
      "Add toggle to settings page",
      "Persist user preference",
      "Support system preference detection",
    ],
    reward: { amount: 300, currency: "USDC" },
    difficulty: "easy",
    tags: ["ui", "theme", "settings", "dark-mode"],
    status: "claimed",
    createdAt: "2025-01-10T08:00:00Z",
    updatedAt: "2025-01-17T11:00:00Z",
  },
  {
    id: "3",
    type: "documentation",
    title: "Write API documentation for bounty endpoints",
    project: {
      name: "Boundless Finance",
      logo: "/logo.svg",
      url: "https://boundless.fi",
    },
    github: {
      repoUrl: "https://github.com/boundlessfi/bounties",
      issueUrl: "https://github.com/boundlessfi/bounties/issues/3",
      issueNumber: 3,
    },
    description: `## Documentation Needed
Create comprehensive API documentation for all bounty-related endpoints.

## Endpoints to Document
- GET /api/bounties
- GET /api/bounties/:id
- POST /api/bounties/:id/claim
- POST /api/bounties/:id/submit`,
    reward: { amount: 200, currency: "USDC" },
    difficulty: "easy",
    tags: ["documentation", "api", "openapi"],
    status: "closed",
    createdAt: "2025-01-05T12:00:00Z",
    updatedAt: "2025-01-12T16:00:00Z",
  },
]

export function getBountyById(id: string): BountyDetails | undefined {
  return mockBounties.find((bounty) => bounty.id === id)
}

export function getAllBounties(): BountyDetails[] {
  return mockBounties
}
