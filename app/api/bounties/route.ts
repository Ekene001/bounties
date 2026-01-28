import { NextResponse } from 'next/server';
import { getAllBounties } from '@/lib/mock-bounty';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const allBounties = getAllBounties();

    // Apply filters from params
    let filtered = allBounties;

    const status = searchParams.get('status');
    if (status) filtered = filtered.filter(b => b.status === status);

    const type = searchParams.get('type');
    if (type) filtered = filtered.filter(b => b.type === type);

    const difficulty = searchParams.get('difficulty');
    if (difficulty) filtered = filtered.filter(b => b.difficulty === difficulty);

    const projectId = searchParams.get('projectId');
    if (projectId) filtered = filtered.filter(b => b.projectId === projectId);

    const tags = searchParams.get('tags');
    if (tags) {
        const tagArray = tags.split(',').filter(Boolean);
        if (tagArray.length > 0) {
            filtered = filtered.filter(b => 
                tagArray.some(tag => b.tags.includes(tag))
            );
        }
    }

    const search = searchParams.get('search');
    if (search) {
        const lower = search.toLowerCase();
        filtered = filtered.filter(b =>
            b.issueTitle.toLowerCase().includes(lower) ||
            b.description.toLowerCase().includes(lower)
        );
    }

    return NextResponse.json({
        data: filtered,
        pagination: {
            page: 1,
            limit: 20,
            total: filtered.length,
            totalPages: 1,
        },
    });
}
