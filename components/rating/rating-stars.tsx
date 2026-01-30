import React, { useState } from 'react';

interface RatingStarsProps {
  value: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  displayOnly?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ value, onChange, disabled, displayOnly }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onChange || disabled || displayOnly) return;
    if (e.key === 'ArrowLeft' && value > 1) onChange(value - 1);
    if (e.key === 'ArrowRight' && value < 5) onChange(value + 1);
  };

  return (
    <div
      tabIndex={displayOnly ? -1 : 0}
      role={displayOnly ? 'img' : 'slider'}
      aria-valuenow={value}
      aria-valuemin={1}
      aria-valuemax={5}
      onKeyDown={handleKeyDown}
      style={{ display: 'flex', gap: 4, outline: 'none', cursor: displayOnly ? 'default' : 'pointer' }}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onMouseEnter={() => !displayOnly && setHovered(star)}
          onMouseLeave={() => !displayOnly && setHovered(null)}
          onClick={() => onChange && !disabled && !displayOnly && onChange(star)}
          style={{
            color: (hovered ?? value) >= star ? '#FFD700' : '#CCC',
            fontSize: 28,
            transition: 'color 0.2s',
            pointerEvents: displayOnly ? 'none' : 'auto',
            userSelect: 'none',
          }}
          aria-label={star + ' star'}
        >
          ★
        </span>
      ))}
    </div>
  );
};
