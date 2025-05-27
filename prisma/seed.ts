import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  try {
    // Clear existing data
    await prisma.user.deleteMany()
    console.log('Existing data cleared.')

    const blogs = await Promise.all([
      prisma.blog.create({
        data: {
          title: "test",
          content: "test",
          userId: "1",
        }
      })
      
    ])

    console.log(`Created ${blogs.length} users successfully.`)
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