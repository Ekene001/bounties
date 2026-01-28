import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Project } from "@/types/project";

interface ProjectMaintainersProps {
  maintainers: Project["maintainers"];
}

export function ProjectMaintainers({ maintainers }: ProjectMaintainersProps) {
  if (!maintainers || maintainers.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-gray-400">Maintainers</h3>
      <div className="flex flex-wrap gap-3">
        {maintainers.map((maintainer) => {
          const content = (
            <div className="flex items-center gap-2 group/maintainer">
              <Avatar className="size-8 border border-gray-800">
                <AvatarImage src={maintainer.avatarUrl} alt={maintainer.username} />
                <AvatarFallback className="bg-gray-800 text-xs text-gray-400">
                  {maintainer.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-300 group-hover/maintainer:text-primary transition-colors">
                @{maintainer.username}
              </span>
            </div>
          );

          if (maintainer.profileUrl) {
            return (
              <Link
                key={maintainer.userId}
                href={maintainer.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
              >
                {content}
              </Link>
            );
          }

          return <div key={maintainer.userId}>{content}</div>;
        })}
      </div>
    </div>
  );
}
