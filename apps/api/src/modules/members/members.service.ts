import { prisma } from '../../lib/prisma';

export function createMember(
    data: { name: string; email: string }
) {
    return prisma.member.create({ data });
}

export function listMembers(q?: string) {
    if (!q) {
        return prisma.member.findMany({
            orderBy: { name: 'desc' },
        });
    }
    return prisma.member.findMany({
        where: {
            OR: [
                { name: { contains: q, mode: 'insensitive' } },
                { email: { contains: q, mode: 'insensitive' } },
            ],
        },
        orderBy: { name: 'desc' },
  })
}

export async function getMember(id: number) {
    return prisma.member.findUnique({
        where: { id },
        include: {
            memberships: { where: { endDate: null }, include: { plan: true } },
            checkins: { orderBy: { date: 'desc' }, take: 1 }
        }
    });
}

export async function getMemberSummary(memberId: number) {
    const member = await prisma.member.findUnique({
        where: { id: memberId },
    })

    if (!member) {
        throw new Error('Member not found')
    }

    // membresía activa
    const activeMembership = await prisma.membership.findFirst({
        where: {
        memberId,
        endDate: null,
        },
        include: {
        plan: true,
        },
    })

    // último check-in
    const lastCheckIn = await prisma.checkIn.findFirst({
        where: { memberId },
        orderBy: { date: 'desc' },
    })

    // check-ins últimos 30 días
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const checkInsLast30Days = await prisma.checkIn.count({
        where: {
        memberId,
        date: {
            gte: thirtyDaysAgo,
        },
        },
    })

    return {
        id: member.id,
        name: member.name,
        email: member.email,
        membership: activeMembership
        ? {
            active: true,
            plan: activeMembership.plan.name,
            }
        : {
            active: false,
            plan: null,
            },
        lastCheckIn: lastCheckIn?.date ?? null,
        checkInsLast30Days,
    }
}
