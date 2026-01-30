import React, { useState } from 'react';
import { RatingStars } from './rating-stars';

interface RatingModalProps {
  contributor: {
    id: string;
    name: string;
    reputation: number;
  };
  bounty: {
    id: string;
    title: string;
  };
  onSubmit: (rating: number, feedback: string) => Promise<void>;
  onClose: () => void;
}

export const RatingModal: React.FC<RatingModalProps> = ({ contributor, bounty, onSubmit, onClose }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (rating < 1 || rating > 5) {
      setError('Please select a rating between 1 and 5.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await onSubmit(rating, feedback);
      setSuccess(true);
    } catch (e) {
      setError('Failed to submit rating. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="modal">
        <h2>Success!</h2>
        <p>Rating submitted. Contributor's reputation updated.</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <div className="modal">
      <h2>Rate Contributor</h2>
      <div>
        <strong>Bounty:</strong> {bounty.title}
      </div>
      <div>
        <strong>Contributor:</strong> {contributor.name}
      </div>
      <div>
        <strong>Current Reputation:</strong> {contributor.reputation}
      </div>
      <div style={{ margin: '16px 0' }}>
        <RatingStars value={rating} onChange={setRating} />
      </div>
      <textarea
        placeholder="Optional feedback"
        value={feedback}
        onChange={e => setFeedback(e.target.value)}
        rows={3}
        style={{ width: '100%', marginBottom: 8 }}
      />
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      <button onClick={onClose} style={{ marginLeft: 8 }}>Cancel</button>
    </div>
  );
};
