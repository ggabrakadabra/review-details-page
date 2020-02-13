import React from 'react';
import { render } from '@testing-library/react';
import ReviewCommentCard, { ReviewCommentCardProps } from './ReviewCommentCard';

const setup = () => {
  const defaultProps: ReviewCommentCardProps = {
    username: 'gabrakadabra',
    description: 'whoa description',
    date: '01/12/2020',
    editComment: (username: string, description: string, showCommentForm: boolean) => {}
  }

  const utils = render(<ReviewCommentCard {...defaultProps} />);

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