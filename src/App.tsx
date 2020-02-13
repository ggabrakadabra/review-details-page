import React from 'react';
import './App.scss';
import ReviewCardModal, { ReviewCardModalProps } from './components/ReviewCardModal/ReviewCardModal';
import { getReviews } from './api/fetch';

function App() {
  const [data, setData] = React.useState([]);

  const setReviews = React.useCallback(async () => {
    const reviews = await getReviews()
    setData(reviews)
  }, [getReviews, setData])
  
  React.useEffect(() => {
    setReviews();
  }, [setReviews]);

  return (
    <div className='app-container' data-testid='app-container'>
      <div className='app-header'>Reviews</div>
      <div className='review-list' data-testid='review-list'>
        {data.map(review => {
          const {
            id,
            author,
            place,
            rating,
            content,
            comment, 
            published_at
          } = review;

          const reviewProps: ReviewCardModalProps = {
            id,
            author,
            place,
            rating,
            content,
            comment,
            publishedAt: published_at
          }
          
          return (
            <ReviewCardModal key={id} {...reviewProps} />
          )
        })}
      </div>
    </div>
  );
}

export default App;
