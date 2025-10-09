'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Item = {
  id: string;
  name: string;
  brand: string | null;
  goodPoints: string | null;
  imageUrl: string | null;
  link: string | null;
};

type DashboardClientProps = {
  items: Item[];
  name: string | null;
  username: string | null;
};

// This component is specifically for the dashboard. It always shows management controls.
export default function DashboardClient({ items, name, username }: DashboardClientProps) {
  const router = useRouter();
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; show: boolean }>({ message: '', show: false });

  const showNotification = (message: string) => {
    setNotification({ message, show: true });
    setTimeout(() => {
      setNotification({ message: '', show: false });
    }, 3000); // Notification visible for 3 seconds
  };

  const handleDelete = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }
    try {
      const res = await fetch(`/api/items/${itemId}`, { method: 'DELETE' });
      if (res.ok) {
        showNotification('아이템이 성공적으로 삭제되었습니다.');
        router.refresh();
      } else {
        const data = await res.json();
        showNotification(data.message || '아이템 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      showNotification('예상치 못한 오류가 발생했습니다.');
    }
  };

  const handleCopyLink = () => {
    const publicUrl = `${window.location.origin}/${username}`;
    navigator.clipboard.writeText(publicUrl)
      .then(() => {
        showNotification('페이지 링크가 복사되었습니다. 방문자들이 쉽게 찾을 수 있는 곳에 붙여넣어주세요.');
      })
      .catch(err => {
        console.error('Failed to copy link:', err);
        showNotification('링크 복사에 실패했습니다.');
      });
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    border: '2px solid white',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '60% 40% 30% 70% / 70% 30% 70% 30%',
    fontFamily: 'var(--font-rock-salt)',
    margin: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
  };

  return (
    <div style={{ position: 'relative' }}>
      {notification.show && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          color: 'black',
          padding: '10px 20px',
          borderRadius: '8px',
          zIndex: 1050,
          transition: 'opacity 0.5s ease-in-out',
          opacity: notification.show ? 1 : 0,
        }}>
          {notification.message}
        </div>
      )}

      <div style={{ position: 'absolute', top: '-40px', right: 0, zIndex: 10, display: 'flex', flexDirection: 'column' }}>
        <button onClick={handleCopyLink} style={buttonStyle}>
          Copy Link
        </button>
        <Link href="/add-item" style={buttonStyle}>
          Add Item
        </Link>
      </div>

      <div className="text-center mb-5">
        <h1 style={{ fontSize: '3rem' }}>
          MyFaves3
        </h1>
      </div>

      <h2 className="mb-3">Your Items</h2>

      {items.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {items.map((item) => (
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
                  {activeItemId === item.id && item.goodPoints && (
                    <div className="good-points-overlay">
                      <p>{item.goodPoints}</p>
                    </div>
                  )}
                </div>
                <div className="card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1, minWidth: 0, marginRight: '1rem' }}>
                      <h5 className="card-title" style={{ fontFamily: '"Nanum Brush Script", var(--font-merienda)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</h5>
                      {item.goodPoints && (
                        <p
                          className="card-text heart-icon"
                          onClick={() => setActiveItemId(activeItemId === item.id ? null : item.id)}
                          style={{ fontFamily: 'var(--font-rock-salt)' }}
                        >
                          ❤️
                        </p>
                      )}
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
                <div className="card-footer d-flex justify-content-end align-items-center">
                  <div className="btn-group">
                    <Link href={`/edit-item/${item.id}`} className="btn btn-secondary btn-sm">
                      <span style={{ fontFamily: 'var(--font-rock-salt)' }}>Edit</span>
                    </Link>
                    <button onClick={() => handleDelete(item.id)} className="btn btn-danger btn-sm" style={{ fontFamily: 'var(--font-rock-salt)' }}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-4">
          {"You haven't added any items yet. Click 'Add New Item' to get started!"}
        </p>
      )}
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
