import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getBountyById } from "@/lib/mock-bounty"
import { truncateAtWordBoundary } from "@/lib/truncate"
import { BountyHeader } from "@/components/bounty/bounty-header"
import { BountyContent } from "@/components/bounty/bounty-content"
import { BountySidebar } from "@/components/bounty/bounty-sidebar"
import { Separator } from "@/components/ui/separator"

interface BountyPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: BountyPageProps): Promise<Metadata> {
  const { id } = await params
  const bounty = getBountyById(id)

  if (!bounty) {
    return { title: "Bounty Not Found" }
  }

  return {
    title: `${bounty.title} | ${bounty.project.name}`,
    description: truncateAtWordBoundary(bounty.description, 160),
  }
}

export default async function BountyPage({ params }: BountyPageProps) {
  const { id } = await params
  const bounty = getBountyById(id)

  if (!bounty) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background-main-bg text-gray-50">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_300px] gap-8">
          <main className="space-y-6">
            <BountyHeader bounty={bounty} />
            <Separator className="bg-gray-800" />
            <BountyContent bounty={bounty} />
          </main>

          <aside className="mt-8 lg:mt-0">
            <BountySidebar bounty={bounty} />
          </aside>
        </div>
      </div>
    </div>
  )
}
