import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ReviewDetailsCard, { ReviewDetailsCardProps } from './ReviewDetailsCard';

const setup = (defaultProps: ReviewDetailsCardProps) => {
  const utils = render(<ReviewDetailsCard {...defaultProps} />);
  const reviewCommentCard = utils.queryByTestId('review-comment-card') as HTMLElement;
  const reviewCard = utils.queryByTestId('review-card') as HTMLElement;
  const commentButton = utils.queryByTestId('submit-comment-button') as HTMLElement;
  const usernameInput = utils.queryByTestId('username') as HTMLInputElement;
  const descriptionInput = utils.queryByTestId('description') as HTMLInputElement;

  return {
    reviewCommentCard,
    reviewCard,
    commentButton,
    usernameInput,
    descriptionInput,
    ...utils,
  };
};

describe('ReviewCommentCard', () => {
  it('renders review information', () => {
    const defaultProps: ReviewDetailsCardProps = {
      author: 'Gabrielle Williams',
      place: 'Restaurant',
      publishedAt: '01/20/2020',
      rating: 4,
      content: 'What a great restaurant',
      id: '1234',
      comment: {
        username: '',
        description: '',
        date: '',
      }
    }
    const { reviewCommentCard, reviewCard, commentButton, descriptionInput, usernameInput } = setup(defaultProps);
    expect(reviewCard).toBeInTheDocument();

    fireEvent.click(commentButton);
    fireEvent.change(descriptionInput, { target: { value: 'random comment' } })
    fireEvent.change(usernameInput, { target: { value: 'random username' } })
    fireEvent.click(commentButton);
    
    expect(reviewCommentCard).toBeInTheDocument();
  });
});