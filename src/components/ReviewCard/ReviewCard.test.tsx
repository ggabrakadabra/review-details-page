import React from 'react';
import { render } from '@testing-library/react';
import ReviewCard, { ReviewCardProps } from './ReviewCard';

const setup = () => {
  const defaultProps: ReviewCardProps = {
    author: 'Gabrielle Williams',
    place: 'Restaurant',
    publishedAt: '01/20/2020',
    rating: 4,
    content: 'What a great restaurant'
  }

  const utils = render(<ReviewCard {...defaultProps} />);

  const reviewCard = utils.getByTestId('review-card') as HTMLInputElement;

  return {
    reviewCard,
    ...utils,
  };
};

describe('ReviewCard', () => {
  it('renders review information', () => {
    const {reviewCard } = setup();
    expect(reviewCard).toBeInTheDocument();
  });
});