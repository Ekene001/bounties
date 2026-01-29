import { NextResponse } from 'next/server';
import { BountyStore } from '@/lib/store';
import { Submission } from '@/types/participation';

const generateId = () => crypto.randomUUID();

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: bountyId } = await params;

    try {
        const body = await request.json();
        const { contributorId, content } = body;

        if (!contributorId || !content) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const bounty = BountyStore.getBountyById(bountyId);
        if (!bounty) {
            return NextResponse.json({ error: 'Bounty not found' }, { status: 404 });
        }

        const allowedModels = ['single-claim', 'competition', 'multi-winner', 'application'];
        if (!allowedModels.includes(bounty.claimingModel)) {
            return NextResponse.json({ error: 'Submission not allowed for this bounty type' }, { status: 400 });
        }

        const existingSubmission = BountyStore.getSubmissionsByBounty(bountyId).find(
            s => s.contributorId === contributorId
        );

        if (existingSubmission) {
            return NextResponse.json({ error: 'Duplicate submission' }, { status: 409 });
        }

        const submission: Submission = {
            id: generateId(),
            bountyId,
            contributorId,
            content,
            status: 'pending',
            submittedAt: new Date().toISOString(),
        };

        BountyStore.addSubmission(submission);

        return NextResponse.json({ success: true, data: submission });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
