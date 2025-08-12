import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const prisma = new PrismaClient()

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}

async function main() {
  const users = Array.from({ length: 50 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.lorem.sentence(),
    avatar: faker.image.avatar(),
  }))

  await prisma.user.createMany({
    data: users,
  })

  const posts = Array.from({ length: 50 }).map(() => ({
    title: faker.lorem.sentence(),
    slug: generateSlug(faker.lorem.sentence()),
    content: faker.lorem.paragraph(3),
    thumbnail: faker.image.urlLoremFlickr(),
    authorId: faker.number.int({ min: 1, max: 50 }),
    published: true,
  }))

  await Promise.all(
    posts.map((post) =>
      prisma.post.create({
        data: {
          ...post,
          comments: {
            createMany: {
              data: Array.from({ length: 20 }).map(() => ({
                content: faker.lorem.sentence(),
                authorId: faker.number.int({ min: 1, max: 50 }),
              })),
            },
          },
        },
      }),
    ),
  )

  console.log('Seeding Completed!')
}

main()
  .then(() => {
    prisma.$disconnect()
    process.exit(0)
  })
  .catch((e) => {
    prisma.$disconnect()
    console.error(e)
    process.exit(1)
  })
