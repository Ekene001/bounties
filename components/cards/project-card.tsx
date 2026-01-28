"use client";

import { Calendar, Clock, CheckCircle2, Pause, Activity } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusConfig = {
    active: {
      icon: Activity,
      label: "Active",
      className:
        "bg-success-green/20 text-success-green-darker border-success-green/30",
    },
    completed: {
      icon: CheckCircle2,
      label: "Completed",
      className: "bg-blue-ish/10 text-blue-800 border-blue-ish/30",
    },
    paused: {
      icon: Pause,
      label: "Paused",
      className:
        "bg-warning-orange/20 text-warning-orange-darker border-warning-orange/30",
    },
  };

  const status = statusConfig[project.status];
  const StatusIcon = status.icon;

  const progress = project.milestones
    ? Math.round(
        ((project.completedMilestones || 0) / project.milestones) * 100,
      )
    : 0;

  return (
    <div className="block group">
      <Card className="h-full bg-background-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-semibold text-gray-100 group-hover:text-primary transition-colors line-clamp-2">
              {project.title}
            </CardTitle>
            <Badge variant="outline" className={`${status.className} shrink-0`}>
              <StatusIcon className="mr-1 h-3 w-3" />
              {status.label}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2 text-gray-400">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/20 text-xs"
              >
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge
                variant="secondary"
                className="bg-muted text-muted-foreground text-xs"
              >
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Progress Bar */}
          {project.milestones && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-400">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-xs text-gray-400">
                {project.completedMilestones} of {project.milestones} milestones
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t border-border/50">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>
                {formatDistanceToNow(project.createdAt, { addSuffix: true })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>
                Updated{" "}
                {formatDistanceToNow(project.updatedAt, { addSuffix: true })}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
