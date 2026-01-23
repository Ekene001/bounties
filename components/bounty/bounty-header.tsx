import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import type { BountyDetails, BountyType, BountyStatus, DifficultyLevel } from "@/types/bounty"
import { Bug, Sparkles, FileText, RefreshCw, Circle } from "lucide-react"

const typeConfig: Record<BountyType, { label: string; icon: React.ReactNode; className: string }> = {
  bug: { label: "Bug", icon: <Bug className="size-3" />, className: "bg-error-500 text-white border-transparent" },
  feature: { label: "Feature", icon: <Sparkles className="size-3" />, className: "bg-primary text-primary-foreground border-transparent" },
  documentation: { label: "Docs", icon: <FileText className="size-3" />, className: "bg-secondary-500 text-white border-transparent" },
  refactor: { label: "Refactor", icon: <RefreshCw className="size-3" />, className: "bg-gray-700 text-gray-100 border-transparent" },
  other: { label: "Other", icon: <Circle className="size-3" />, className: "bg-gray-800 text-gray-300 border-gray-600" },
}

const statusConfig: Record<BountyStatus, { label: string; className: string }> = {
  open: { label: "Open", className: "bg-success-500 text-white border-transparent" },
  claimed: { label: "Claimed", className: "bg-warning-500 text-white border-transparent" },
  closed: { label: "Closed", className: "bg-gray-700 text-gray-300 border-transparent" },
}

const difficultyConfig: Record<DifficultyLevel, { label: string; className: string }> = {
  easy: { label: "Easy", className: "text-success-300" },
  medium: { label: "Medium", className: "text-warning-300" },
  hard: { label: "Hard", className: "text-error-300" },
}

interface BountyHeaderProps {
  bounty: BountyDetails
}

export function BountyHeader({ bounty }: BountyHeaderProps) {
  const typeInfo = typeConfig[bounty.type]
  const statusInfo = statusConfig[bounty.status]
  const difficultyInfo = difficultyConfig[bounty.difficulty]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge className={typeInfo.className}>
          {typeInfo.icon}
          {typeInfo.label}
        </Badge>
        <Badge className={statusInfo.className}>
          {statusInfo.label}
        </Badge>
      </div>

      <div className="flex items-center gap-3">
        {bounty.project.logo && (
          <Image
            src={bounty.project.logo}
            alt={bounty.project.name}
            width={32}
            height={32}
            className="rounded-md"
          />
        )}
        <span className="text-sm text-gray-400">{bounty.project.name}</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-50 md:text-3xl">{bounty.title}</h1>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">
            {bounty.reward.amount} {bounty.reward.currency}
          </span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <span className="text-gray-500">Difficulty:</span>
          <span className={difficultyInfo.className}>{difficultyInfo.label}</span>
        </div>
      </div>
    </div>
  )
}
