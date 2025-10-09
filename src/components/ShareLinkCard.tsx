'use client';

// No longer need useState

type ShareLinkCardProps = {
  shareableLink: string;
};

export default function ShareLinkCard({ shareableLink }: ShareLinkCardProps) {

  const handleCopy = () => {
    navigator.clipboard.writeText(shareableLink).then(() => {
      alert('클립보드에 복사되었습니다.');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy link.');
    });
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Your Shareable Link</h5>
        <p className="card-text">Share this link on your social media profiles.</p>
        {/* The input group is replaced by a single button */}
        <button className="btn btn-primary" type="button" onClick={handleCopy}>
          링크 복사하기
        </button>
      </div>
    </div>
  );
}
