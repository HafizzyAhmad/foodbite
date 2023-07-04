import React from 'react';
import {
  EmptyLove,
  EmptyLoveLarge,
  FullLove,
  FullLoveLarge,
  HalfLove,
  HalfLoveLarge,
} from '../components/icon';

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

function RatingLoveLarge(score: number) {
  const totalRating = 5;
  const fullRating = Math.floor(score);
  const hasHalfRating = score - fullRating >= 0.5;

  const love = Array(totalRating)
    .fill(null)
    .map((_, index) => {
      if (index < fullRating) {
        return <FullLoveLarge key={`love-${index}`} />;
      } else if (index === fullRating && hasHalfRating) {
        return <HalfLoveLarge key="love-half" />;
      } else {
        return <EmptyLoveLarge key={`love-empty-${index}`} />;
      }
    });
  return love;
}

export { RatingLove, RatingLoveLarge };
