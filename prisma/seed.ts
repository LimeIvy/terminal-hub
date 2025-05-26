import { PrismaClient, Role } from '@prisma/client'
import * as argon2 from "argon2";

const prisma = new PrismaClient()

async function main() {
  try {
    // Clear existing data
    await prisma.user.deleteMany()
    console.log('Existing data cleared.')

    const users = await Promise.all([
      prisma.user.create({
        data: {
          email: 'alice@example.com',
          name: 'Alice',
          password: await argon2.hash('alicepass123'),
          role: Role.ADMIN,
        },
      }),
      prisma.user.create({
        data: {
          email: 'bob@example.com',
          name: 'Bob',
          password: await argon2.hash('bobpass456'),
          role: Role.GUEST,
        },
      }),
      prisma.user.create({
        data: {
          email: 'charlie@example.com',
          name: 'Charlie',
          password: await argon2.hash('charliepass789'),
          role: Role.GUEST,
        },
      })
    ])

    const posts = await Promise.all([
      prisma.post.create({
        data: {
          text: 'Hello, world!',
        },
      }),
      prisma.post.create({
        data: {
          text: 'Hello, Hono!',
        },
      }),
      prisma.post.create({
        data: {
          text: 'Hello, Prisma!',
        },
      }),
      
    ])

    console.log(`Created ${users.length} users successfully.`)
    console.log(`Created ${posts.length} posts successfully.`)
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