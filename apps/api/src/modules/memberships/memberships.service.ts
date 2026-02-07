import { prisma } from '../../lib/prisma';

export async function assignMembership(
    memberId: number,
    planId: number,
    startDate: Date
) {
    return prisma.$transaction(async (tx: any) => {
        const active = await tx.membership.findFirst({
            where: { memberId, endDate: null }
        });

        if (active) throw new Error('Member already has active membership')

        return tx.membership.create({
            data: { memberId, planId, startDate }
        });
    });
}

export function cancelMembership(
    id: number,
    endDate: Date
) {
    return prisma.membership.update({
        where: { id },
        data: { endDate }
    });
}