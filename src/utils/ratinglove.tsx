import React from 'react';
import { EmptyLove, FullLove, HalfLove } from '../components/icon';

function RatingLove(score: number) {
  const totalRating = 5;
  const fullRating = Math.floor(score);
  const hasHalfRating = score - fullRating >= 0.5;

  const love = Array(totalRating)
    .fill(null)
    .map((_, index) => {
      if (index < fullRating) {
        return <FullLove key={`love-${index}`} />;
      } else if (index === fullRating && hasHalfRating) {
        return <HalfLove key="love-half" />;
      } else {
        <EmptyLove key={`love-empty-${index}`} />;
      }
    });
  return love;
}

export { RatingLove };
