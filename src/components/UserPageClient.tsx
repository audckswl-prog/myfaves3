'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type Item = {
  id: string;
  name: string;
  goodPoints: string | null;
  imageUrl: string | null;
  link: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

type User = {
  id: string;
  username: string | null;
  items: Item[];
};

type UserPageClientProps = {
  user: User;
  isOwner: boolean;
};

import WobblyCommentIcon from './WobblyCommentIcon';



export default function UserPageClient({ user, isOwner }: UserPageClientProps) {

  const [activeItemId, setActiveItemId] = useState<string | null>(null);



  return (

    <div className="container my-5">





      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">

        {user.items.map((item) => (

          <div key={item.id} className="col">

            <div className="card h-100">

                            <div style={{ position: 'relative', width: '100%', height: '450px' }}>

                              {item.imageUrl && (

                                <Image

                                  src={item.imageUrl}

                                  alt={item.name}

                                  fill

                                  style={{ objectFit: 'cover' }}

                                  className="card-img-top"

                                />

                              )}

                              {item.goodPoints && (

                                <div className="item-icon-container">

                                  <WobblyCommentIcon onClick={() => setActiveItemId(activeItemId === item.id ? null : item.id)} />

                                </div>

                              )}

                              {activeItemId === item.id && item.goodPoints && (

                                <div className="good-points-overlay">

                                  <p className="good-points-text">{item.goodPoints}</p>

                                </div>

                              )}

                            </div>

                            <div className="card-body">

                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                                <div style={{ flex: 1, minWidth: 0, marginRight: '1rem' }}>

                                  <h5 className="card-title" style={{ fontFamily: 'var(--font-noto-sans-kr)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '1.1rem' }}>{item.name}</h5>

                                </div>

                  {item.link && (

                    <a

                      href={item.link}

                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sm"
                      style={{
                        fontFamily: 'var(--font-rock-salt)',
                        backgroundColor: '#00AEEF',
                        border: 'none',
                        borderRadius: '25% 75% 40% 60% / 75% 25% 60% 40%',
                        color: 'white',
                        padding: '10px 20px',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Purchase Link
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {user.items.length === 0 && (
        <p className="text-center mt-4">
          {/* Simplified message as this is now a purely public view */}
          {"This user hasn't added any items yet."}
        </p>
      )}
      <style jsx>{`
        }

        .item-icon-container {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 1;
        }
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
        .good-points-overlay p.good-points-text {
          font-family: var(--font-noto-sans-kr);
          font-size: 1rem; /* A reasonable base font size */
          word-wrap: break-word;
          max-height: 100%;
        }
      `}</style>
    </div>
  );
}