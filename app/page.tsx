import SignIn from "@/components/login/sign-in";
import Image from "next/image";
import { BountyCard } from "@/components/bounty/bounty-card"

const mockBounty = {
  id: "1",
  title: "Build Authentication System",
  description: "Need a robust auth system with JWT support",
  budget: { amount: 5000, asset: "USDC" },
  status: "open" as const,
  category: "Backend",
  claimingModel: 2 as const,
  creator: { wallet: "0x1234...5678", displayName: "Alice" },
  deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  applicantCount: 3,
  milestoneCount: 2,
}


export default async function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn />
      <BountyCard bounty={mockBounty} />
    </div>
    
    
  );
}
