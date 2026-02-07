import { prisma } from '../../lib/prisma'

export function listPlans() {
  return prisma.plan.findMany({
    orderBy: { id: 'asc' }
  })
}
