'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type Item = {
  id: string;
  name: string;
  goodPoints: string | null;
  description: string | null;
  imageUrl: string | null;
  link: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    username: string | null;
  };
};

type ExplorePageClientProps = {
  items: Item[];
};

export default function ExplorePageClient({ items }: ExplorePageClientProps) {
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Explore Faves</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {items.length === 0 ? (
          <p className="text-center w-100">No items to display yet.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="col">
              <div className="card h-100">
                <div style={{ position: 'relative', width: '100%', paddingTop: '125%' }}>
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="card-img-top"
                    />
                  )}
                  {activeItemId === item.id && item.goodPoints && (
                    <div className="good-points-overlay">
                      <p>{item.goodPoints}</p>
                    </div>
                  )}
                </div>
                <div className="card-body">
                  <h5 className="card-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</h5>
                  {item.goodPoints && (
                    <p
                      className="card-text heart-icon"
                      onClick={() => setActiveItemId(activeItemId === item.id ? null : item.id)}
                    >
                      ❤️
                    </p>
                  )}
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm mt-2">
                      Purchase Link
                    </a>
                  )}
                  {item.user?.username && (
                    <p className="card-text text-muted mt-2">
                      By <Link href={`/users/${item.user.username}`}>@{item.user.username}</Link>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <style jsx>{`
        .heart-icon {
          font-size: 1.5rem;
          cursor: pointer;
        }
        .good-points-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          text-align: center;
          color: black;
        }
        .good-points-overlay p {
          font-size: 1rem; /* A reasonable base font size */
          word-wrap: break-word;
          max-height: 100%;
        }
      `}</style>
    </div>
  );
}