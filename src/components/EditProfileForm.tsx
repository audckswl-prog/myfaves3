'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';

type EditProfileFormProps = {
  user: User;
};

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const router = useRouter();
  const [name, setName] = useState(user.name || '');
  const [bio, setBio] = useState(user.bio || '');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, bio }),
      });

      if (res.ok) {
        alert('Profile updated successfully!');
        router.push('/dashboard');
        router.refresh();
      } else {
        const data = await res.json();
        throw new Error(data.message || 'Failed to update profile.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nickname</label>
        <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="bio" className="form-label">Bio</label>
        <textarea id="bio" className="form-control" rows={5} value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
      </div>
      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  );
}
