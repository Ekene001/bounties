import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Globe, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Project } from "@/types/project";

interface ProjectSidebarProps {
  project: Project;
}

export function ProjectSidebar({ project }: ProjectSidebarProps) {
  const createdTimeAgo = formatDistanceToNow(new Date(project.createdAt), { addSuffix: true });
  const updatedTimeAgo = formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true });

  return (
    <div className="space-y-6">
      {/* Project Stats Card */}
      <Card className="bg-background-card border-gray-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-50">Project Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Total Bounties</span>
            <span className="text-lg font-bold text-gray-50">{project.bountyCount}</span>
          </div>
          <Separator className="bg-gray-800" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Open Bounties</span>
            <span className="text-lg font-bold text-primary">{project.openBountyCount}</span>
          </div>
          <Separator className="bg-gray-800" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Prize Pool</span>
            <span className="text-lg font-bold text-success-400">{project.prizeAmount}</span>
          </div>
        </CardContent>
      </Card>

      {/* Links Card */}
      {project.websiteUrl && (
        <Card className="bg-background-card border-gray-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-50">Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-primary transition-colors group"
            >
              <Globe className="size-4 text-gray-500 group-hover:text-primary transition-colors" />
              <span>Official Website</span>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Timeline Card */}
      <Card className="bg-background-card border-gray-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-50">Timeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-2">
            <Calendar className="size-4 text-gray-500 mt-0.5 shrink-0" />
            <div className="flex-1 space-y-1">
              <p className="text-xs text-gray-500">Created</p>
              <p className="text-sm text-gray-300">{createdTimeAgo}</p>
            </div>
          </div>
          <Separator className="bg-gray-800" />
          <div className="flex items-start gap-2">
            <TrendingUp className="size-4 text-gray-500 mt-0.5 shrink-0" />
            <div className="flex-1 space-y-1">
              <p className="text-xs text-gray-500">Last Updated</p>
              <p className="text-sm text-gray-300">{updatedTimeAgo}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
