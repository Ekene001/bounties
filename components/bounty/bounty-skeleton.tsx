import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export function BountySkeleton() {
  return (
    <div className="min-h-screen bg-background-main-bg">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 bg-gray-800" />
                <Skeleton className="h-6 w-16 bg-gray-800" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="size-8 rounded-md bg-gray-800" />
                <Skeleton className="h-4 w-32 bg-gray-800" />
              </div>
              <Skeleton className="h-9 w-3/4 bg-gray-800" />
              <div className="flex gap-4">
                <Skeleton className="h-8 w-24 bg-gray-800" />
                <Skeleton className="h-4 w-32 bg-gray-800" />
              </div>
            </div>

            <Separator className="bg-gray-800" />

            <div className="space-y-4">
              <Skeleton className="h-6 w-32 bg-gray-800" />
              <Skeleton className="h-4 w-full bg-gray-800" />
              <Skeleton className="h-4 w-full bg-gray-800" />
              <Skeleton className="h-4 w-3/4 bg-gray-800" />
              <Skeleton className="h-4 w-full bg-gray-800" />
              <Skeleton className="h-4 w-1/2 bg-gray-800" />
            </div>

            <Separator className="bg-gray-800" />

            <div className="space-y-4">
              <Skeleton className="h-6 w-40 bg-gray-800" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-gray-800" />
                <Skeleton className="h-4 w-5/6 bg-gray-800" />
                <Skeleton className="h-4 w-4/5 bg-gray-800" />
              </div>
            </div>

            <Separator className="bg-gray-800" />

            <div className="space-y-3">
              <Skeleton className="h-6 w-16 bg-gray-800" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 bg-gray-800" />
                <Skeleton className="h-6 w-20 bg-gray-800" />
                <Skeleton className="h-6 w-14 bg-gray-800" />
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="rounded-xl border border-gray-800 bg-background-card p-6 space-y-4">
              <Skeleton className="h-10 w-full bg-gray-800" />
              <Skeleton className="h-10 w-full bg-gray-800" />
              <Separator className="bg-gray-800" />
              <Skeleton className="h-4 w-28 bg-gray-800" />
              <Skeleton className="h-4 w-32 bg-gray-800" />
              <Separator className="bg-gray-800" />
              <Skeleton className="h-4 w-36 bg-gray-800" />
              <Skeleton className="h-4 w-36 bg-gray-800" />
              <Separator className="bg-gray-800" />
              <Skeleton className="h-10 w-full bg-gray-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
