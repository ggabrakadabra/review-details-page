import React from 'react';
import './App.scss';
import ReviewCard, { ReviewCardProps } from './components/ReviewCard/ReviewCard';
import { isNil } from 'lodash';

function App() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch('http://localhost:3004/reviews', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      setData(myJson)
    });
  }, []);

  return (
    <div className='app-container'>
      <div className='app-header'>Reviews</div>
      <div className='review-list'>
        {data.map((review: ReviewCardProps) => {
          return (
            <ReviewCard key={review.id} {...review} />
          )
        })}
      </div>
    </div>
  );
}

export default App;
