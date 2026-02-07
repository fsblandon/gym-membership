import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

async function main() {
  await prisma.plan.createMany({
    data: [
      { name: 'Basic' },
      { name: 'Premium' }
    ],
    skipDuplicates: true
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
