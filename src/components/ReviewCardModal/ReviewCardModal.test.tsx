import React from 'react';
import { render } from '@testing-library/react';
import ReviewCardModal, { ReviewCardModalProps } from './ReviewCardModal';

const setup = () => {
  const defaultProps: ReviewCardModalProps = {
    id: 'foooo124',
    comment: {
      username: 'gabrakadabra',
      description: 'whoa description',
      date: '01/12/2020'
    },
    author: 'Gabrielle Williams',
    place: 'Restaurant',
    publishedAt: '01/20/2020',
    rating: 4,
    content: 'What a great restaurant'
  }

  const utils = render(<ReviewCardModal {...defaultProps} />);

  const reviewCardContainer = utils.getByTestId('review-card-container') as HTMLInputElement;

  return {
    reviewCardContainer,
    ...utils,
  };
};

describe('ReviewCardModal', () => {
  it('renders review information', () => {
    const {reviewCardContainer } = setup();
    expect(reviewCardContainer).toBeInTheDocument();
  });
});