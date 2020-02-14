import React from 'react';
import { render } from '@testing-library/react';
import ReviewCard, { ReviewCardProps } from './ReviewCard';
import moment from 'moment';

const setup = () => {
  const defaultProps: ReviewCardProps = {
    author: 'Gabrielle Williams',
    place: 'Restaurant',
    publishedAt: moment().format().toString(),
    rating: 4,
    content: 'What a great restaurant'
  }

  const utils = render(<ReviewCard {...defaultProps} />);

  const reviewCard = utils.getByTestId('review-card') as HTMLInputElement;
  const rating = utils.getByTestId('rating') as HTMLInputElement;
  const datePublished = utils.getByTestId('date-published') as HTMLInputElement;

  return {
    reviewCard,
    rating,
    datePublished,
    ...utils,
  };
};

describe('ReviewCard', () => {
  it('renders review information', () => {
    const { reviewCard } = setup();
    expect(reviewCard).toBeInTheDocument();
  });

  it('will render number of stars per rating', () => {
    const { rating } = setup();
    expect(rating.innerHTML.length).toBe(8);
  });

  it('will format published date', () => {
    const { datePublished } = setup();
    const expectedDate = moment().format('MM/DD/YYYY');
    expect(datePublished.innerHTML).toBe(expectedDate);
  });
});