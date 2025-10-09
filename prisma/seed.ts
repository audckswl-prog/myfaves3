import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  // await prisma.item.deleteMany({});
  // await prisma.user.deleteMany({});
  // Create example user
  const user = await prisma.user.upsert({
    where: { username: 'example' },
    update: {},
    create: {
      username: 'example',
      email: 'example@example.com',
      password: 'password123', // In a real app, this should be hashed
    },
  });

  await prisma.item.createMany({
    data: [
      {
        name: 'Classic White T-Shirt',
        
        imageUrl: 'https://via.placeholder.com/300x400.png/FFFFFF/000000?text=T-Shirt',
        link: 'https://example.com/product/1',
        userId: user.id,
      },
      {
        name: 'Vintage Denim Jeans',
        
        imageUrl: 'https://via.placeholder.com/300x400.png/007BFF/FFFFFF?text=Jeans',
        link: 'https://example.com/product/2',
        userId: user.id,
      },
      {
        name: 'Leather Ankle Boots',
        
        imageUrl: 'https://via.placeholder.com/300x400.png/343A40/FFFFFF?text=Boots',
        link: 'https://example.com/product/3',
        userId: user.id,
      },
    ],
  });

  console.log('Database has been seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
