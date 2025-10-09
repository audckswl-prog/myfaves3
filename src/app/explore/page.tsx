import ExplorePageClient from '@/components/ExplorePageClient';
import prisma from '@/lib/db';

export default async function ExplorePage() {
  // Fetch items directly from Prisma in the Server Component
  // This is more efficient than making an API call from a Server Component
  const items = await prisma.item.findMany({
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  console.log('--- ITEMS FROM DATABASE ---', items);

  return <ExplorePageClient items={items} />;
}
