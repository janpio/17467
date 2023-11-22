import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {
  const a = await prisma.a.findUnique({
    where: {
      id: 1,
    },
    include: {
      A_B: { 
        include: {
          B: true
        },
      },
    },
  })

  const a_b = await prisma.a_B.findUnique({
    where: {
      aId_bId: {
        aId: 1,
        bId: 1
      }
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })