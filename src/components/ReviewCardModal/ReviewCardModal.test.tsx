import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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

  const reviewCardContainer = utils.getByTestId('review-card-container') as HTMLElement;
  const reviewCard = utils.queryByTestId('review-card') as HTMLElement;

  return {
    reviewCardContainer,
    reviewCard,
    ...utils,
  };
};

describe('ReviewCardModal', () => {
  it('renders review information', () => {
    const { reviewCardContainer } = setup();
    expect(reviewCardContainer).toBeInTheDocument();
  });

  it('will show detail view', () => {
    const { reviewCardContainer, reviewCard } = setup();
    expect(reviewCard).toBeInTheDocument();

    fireEvent.click(reviewCardContainer);

    expect(reviewCard).not.toBeInTheDocument();
  });
});