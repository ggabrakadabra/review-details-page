import React from 'react';
import { render, waitForElement, act, wait } from '@testing-library/react';
import App from './App';

const setup = () => {
  const utils = render(<App/>);

  const appContainer = utils.getByTestId('app-container') as HTMLElement;
  const reviewList = utils.getByTestId('review-list') as HTMLElement;

  return {
    appContainer,
    reviewList,
    ...utils,
  };
};

describe('App', () => {
  it('renders the app component', () => {
    const { appContainer } = setup();
    expect(appContainer).toBeInTheDocument();
  });

  it('will set review data', () => {
    const { reviewList } = setup();
    expect(reviewList).toBeInTheDocument();
  });
});

