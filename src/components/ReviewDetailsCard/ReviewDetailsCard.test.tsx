import React from 'react';
import { render } from '@testing-library/react';
import ReviewDetailsCard, { ReviewDetailsCardProps } from './ReviewDetailsCard';

const setup = () => {
  const defaultProps: ReviewDetailsCardProps = {
    author: 'Gabrielle Williams',
    place: 'Restaurant',
    publishedAt: '01/20/2020',
    rating: 4,
    content: 'What a great restaurant',
    id: '1234',
    comment: {
      username: 'gabrakadabra',
      description: 'whoa description',
      date: '01/12/2020',
    }
  }

  const utils = render(<ReviewDetailsCard {...defaultProps} />);

  const reviewCommentCard = utils.getByTestId('review-comment-card') as HTMLInputElement;

  return {
    reviewCommentCard,
    ...utils,
  };
};

describe('ReviewCommentCard', () => {
  it('renders review information', () => {
    const {reviewCommentCard } = setup();
    expect(reviewCommentCard).toBeInTheDocument();
  });
});