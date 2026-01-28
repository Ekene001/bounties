export type Project = {
  id: string;
  name: string;
  logoUrl: string | null;
  websiteUrl?: string;
  description: string;
  tags: string[];
  bountyCount: number;
  openBountyCount: number;
  creatorName: string;
  creatorAvatarUrl: string | null;
  prizeAmount: string;
  status: "Active" | "Ended" | "Draft";
  bannerUrl: string | null;
  createdAt: string;
  updatedAt: string;
  maintainers?: Array<{
    userId: string;
    username: string;
    avatarUrl?: string;
    profileUrl?: string;
  }>;
};
