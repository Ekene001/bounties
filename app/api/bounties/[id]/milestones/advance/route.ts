import { NextResponse } from 'next/server';
import { BountyStore } from '@/lib/store';
// import { MilestoneStatus } from '@/types/participation';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: bountyId } = await params;

    try {
        const body = await request.json();
        const { contributorId, action } = body; // action: 'advance' | 'complete' | 'remove'

        if (!contributorId || !action) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (!['advance', 'complete', 'remove'].includes(action)) {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }

        const participations = BountyStore.getMilestoneParticipationsByBounty(bountyId);
        const participation = participations.find(p => p.contributorId === contributorId);

        if (!participation) {
            return NextResponse.json({ error: 'Participation not found' }, { status: 404 });
        }

        let updates: Partial<typeof participation> = {
            lastUpdatedAt: new Date().toISOString()
        };

        if (action === 'advance') {
            updates.currentMilestone = participation.currentMilestone + 1;
            updates.status = 'advanced';
        } else if (action === 'complete') {
            updates.status = 'completed';
        } else if (action === 'remove') {
            return NextResponse.json({ error: 'Remove action not supported yet' }, { status: 400 });
        }

        const updated = BountyStore.updateMilestoneParticipation(participation.id, updates);

        return NextResponse.json({ success: true, data: updated });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
