import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getBountyById } from "@/lib/mock-bounty"
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
    description: bounty.description.slice(0, 160),
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
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <main className="space-y-6">
            <BountyHeader bounty={bounty} />
            <Separator className="bg-gray-800" />
            <BountyContent bounty={bounty} />
          </main>

          <aside className="hidden lg:block">
            <BountySidebar bounty={bounty} />
          </aside>
        </div>

        <div className="mt-8 lg:hidden">
          <BountySidebar bounty={bounty} />
        </div>
      </div>
    </div>
  )
}
