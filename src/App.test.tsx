import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import App from './App';
import { FetchMock } from '@react-mock/fetch';

const setup = () => {
  const response = [
    {
      id: "5d707203b65083001e956f0a",
      author: "Weeks Duran",
      place: "Big Johns Burgers",
      published_at: "Thu Jun 27 1974 11:46:39 GMT-0500 (Central Daylight Time)",
      rating: 5,
      content: "Ipsum mollit anim pariatur eu qui velit Lorem ea enim excepteur ut fugiat fugiat esse. Incididunt consectetur deserunt pariatur magna sit dolore voluptate. Minim cupidatat fugiat magna quis consectetur esse id esse adipisicing anim velit. Cillum mollit et nisi ex occaecat labore enim nulla cupidatat. Occaecat Lorem officia est sit enim amet commodo sunt occaecat reprehenderit Lorem culpa. Aute anim ullamco voluptate incididunt incididunt excepteur in irure.\r\n",
      publishedAt: "Thu Jun 27 1974 11:46:39 GMT-0500 (Central Daylight Time)",
      comment: {
        date: "Thursday, February 13, 7:57 am ",
        username: "gabrakdabdra",
        description: "wow this place was so good to eat at"
      }
    }
  ]

  const utils = render(
    <FetchMock options={{ matcher: 'http://localhost:3004/reviews', response, method: 'GET' }}>
      <App/>
    </FetchMock>
    );

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

  it('will set review data', async () => {
    const { reviewList } = setup();

    await waitForElement(() => reviewList);
    expect(reviewList).toBeInTheDocument();
  });
});

