import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.project.deleteMany()
    console.log('Existing data cleared.')

    const projects = await Promise.all([
      prisma.project.create({
        data: {
          title: "test",
          description: "test",
          status: "RECRUITING",
        }
      })
      
    ])

    console.log(`Created ${projects.length} projects successfully.`)
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })