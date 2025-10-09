import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import styles from '../landing.module.css';
import ConfettiBackground from '@/components/ConfettiBackground';

type UserLandingPageProps = {
  params: {
    username: string;
  };
};

// This is the new "Personal Link" landing page.
export default async function UserLandingPage({ params }: UserLandingPageProps) {
  const { username } = params;

  // Check if the user exists in the database
  const user = await prisma.user.findUnique({
    where: { username },
  });

  // If the user doesn't exist, show a 404 page.
  if (!user) {
    notFound();
  }

  // The link for the ENTER button now goes to the user's item page.
  const enterHref = `/users/${username}`;

  return (
    <div className={styles.fullScreenContainer}>
      <ConfettiBackground />
      <div className={styles.contentOverlay}>
        <h1 className={styles.title}>MyFaves3</h1>
        <p className={styles.description}>
          당신이 가장 아끼는 아이템들을 세상에 보여주세요.
        </p>
        <Link href={enterHref} className={styles.enterButton}>
          ENTER
        </Link>
      </div>
    </div>
  );
}
