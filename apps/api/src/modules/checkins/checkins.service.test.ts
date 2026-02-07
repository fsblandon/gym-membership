import { prisma } from '../../lib/prisma.js';
import { createCheckIn } from './checkins.service';
import { describe, it, expect, beforeEach } from 'vitest'

describe('CheckIn Service', () => {
  let memberId: number
  let planId: number

  beforeEach(async () => {
    await prisma.checkIn.deleteMany()
    await prisma.membership.deleteMany()
    await prisma.member.deleteMany()
    await prisma.plan.deleteMany()

    const member = await prisma.member.create({
      data: {
        name: 'Test Member',
        email: 'test@test.com',
      },
    })

    const plan = await prisma.plan.create({
      data: {
        name: 'Basic'
      },
    })

    memberId = member.id
    planId = plan.id
  })

  it('should NOT allow check-in without active membership', async () => {
    await expect(createCheckIn(memberId)).rejects.toThrow(
      'No active membership'
    )
  })

  it('should allow check-in with active membership', async () => {
    await prisma.membership.create({
      data: {
        memberId,
        planId,
        startDate: new Date(),
      },
    })

    const checkin = await createCheckIn(memberId)

    expect(checkin).toBeDefined()
    expect(checkin.memberId).toBe(memberId)
    expect(checkin.date).toBeInstanceOf(Date)
  })
})
