"use client";

import {
  Calendar,
  Clock,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Award,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bounty } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

interface BountyCardProps {
  bounty: Bounty;
}

export function BountyCard({ bounty }: BountyCardProps) {
  const statusConfig = {
    open: {
      icon: AlertCircle,
      label: "Open",
      className:
        "bg-success-green/20 text-success-green-darker border-success-green/30",
    },
    "in-progress": {
      icon: Loader2,
      label: "In Progress",
      className:
        "bg-warning-orange/20 text-warning-orange-darker border-warning-orange/30",
    },
    completed: {
      icon: CheckCircle2,
      label: "Completed",
      className: "bg-blue-ish/20 text-blue-ish-darker border-blue-ish/30",
    },
  };

  const difficultyConfig = {
    beginner: {
      label: "Beginner",
      className: "bg-success-green/10 text-success-green-darker",
    },
    intermediate: {
      label: "Intermediate",
      className: "bg-warning-orange/10 text-warning-orange-darker",
    },
    advanced: {
      label: "Advanced",
      className: "bg-error-status/10 text-error-status",
    },
  };

  const status = statusConfig[bounty.status];
  const difficulty = difficultyConfig[bounty.difficulty];
  const StatusIcon = status.icon;

  return (
    <div className="block group">
      <Card className="h-full bg-background-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-semibold text-gray-100 group-hover:text-primary transition-colors line-clamp-2">
              {bounty.title}
            </CardTitle>
            <Badge variant="outline" className={`${status.className} shrink-0`}>
              <StatusIcon
                className={`mr-1 h-3 w-3 ${bounty.status === "in-progress" ? "animate-spin" : ""}`}
              />
              {status.label}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2 text-gray-400">
            {bounty.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Reward Amount */}
          <div className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-full">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="text-xs text-gray-400">Reward</div>
                <div className="text-xl font-bold text-primary">
                  {bounty.reward.toLocaleString()} {bounty.currency}
                </div>
              </div>
            </div>
            <Badge variant="outline" className={difficulty.className}>
              <Award className="mr-1 h-3 w-3" />
              {difficulty.label}
            </Badge>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {bounty.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/20 text-xs"
              >
                {tag}
              </Badge>
            ))}
            {bounty.tags.length > 3 && (
              <Badge
                variant="secondary"
                className="bg-muted text-muted-foreground text-xs"
              >
                +{bounty.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Deadline */}
          {bounty.deadline && (
            <div className="flex items-center gap-2 p-2 bg-warning-orange/5 border border-warning-orange/20 rounded text-xs">
              <Clock className="h-3 w-3 text-warning-orange-darker" />
              <span className="text-warning-orange-darker">
                Deadline:{" "}
                {formatDistanceToNow(bounty.deadline, { addSuffix: true })}
              </span>
            </div>
          )}

          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t border-border/50">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>
                {formatDistanceToNow(bounty.createdAt, { addSuffix: true })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>
                Updated{" "}
                {formatDistanceToNow(bounty.updatedAt, { addSuffix: true })}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
