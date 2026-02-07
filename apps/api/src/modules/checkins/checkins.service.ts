import { prisma } from '../../lib/prisma';

export async function createCheckIn(memberId: number) {
    const member = await prisma.membership.findFirst({
        where: { memberId, endDate: null }
    });

    if (!member) throw new Error('No active membership');

    const activeMembership = await prisma.membership.findFirst({
        where: { memberId, endDate: null }
    });

    if(!activeMembership) {
        throw new Error('No active membership');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingCheckIn = await prisma.checkIn.findFirst({
        where: {
            memberId,
            date: {
                gte: today
            }
        }
    });

    if (existingCheckIn) {
        throw new Error('Check-in already exists for today');
    }

    return prisma.checkIn.create({ data: { memberId } });
}