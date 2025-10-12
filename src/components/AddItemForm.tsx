'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { upload } from '@vercel/blob/client';

export default function AddItemForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [goodPoints, setGoodPoints] = useState('');
  const [link, setLink] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!file) {
      alert('Please select an image to upload.');
      setIsSubmitting(false);
      return;
    }

    try {
      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });

      // After successful upload, create the item in the database
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          goodPoints,
          imageUrl: newBlob.url, // Use the URL from the uploaded blob
          link,
        }),
      });

      if (res.ok) {
        alert('Item added successfully!');
        router.push('/dashboard');
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to add item.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="goodPoints" className="form-label">Good Points</label>
        <input
          type="text"
          className="form-control"
          id="goodPoints"
          value={goodPoints}
          onChange={(e) => setGoodPoints(e.target.value)}
          maxLength={500}
          required
        />      </div>
      <div className="mb-3">
        <label htmlFor="image" className="form-label">Image</label>
        <input
          type="file"
          className="form-control"
          id="image"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          required // Make file input required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="link" className="form-label">Purchase Link</label>
        <input
          type="url"
          className="form-control"
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        style={{
          fontFamily: 'var(--font-rock-salt)',
          backgroundColor: isSubmitting ? '#ccc' : '#00AEEF',
          border: 'none',
          borderRadius: '25% 75% 40% 60% / 75% 25% 60% 40%',
          color: 'white',
          padding: '10px 20px',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
        }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Uploading...' : 'Add Item'}
      </button>
    </form>
  );
}