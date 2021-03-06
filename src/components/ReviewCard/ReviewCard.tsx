import * as React from 'react';
import './ReviewCard.scss';
import { range } from 'lodash';
import moment from 'moment';

export interface ReviewCardProps {
  author: string;
  place: string;
  publishedAt: string;
  rating: number;
  content: string;
}

export default function ReviewCard(props: ReviewCardProps) {
  const {
    author, 
    place,
    publishedAt,
    rating,
    content,
  } = props; 

  return (
    <div 
      data-testid='review-card'
      className='review-card'>
      <div className='place'>
        {place}
      </div>
      <div className='rating' data-testid='rating'>
        {range(rating).map(() => <React.Fragment key={Math.random()}>	&#x2605;</React.Fragment>)}
      </div>
      <div className='description'>
        {content}
      </div>
      <div className='review-card-footer'>
        <div className='author'>
          {author}
        </div>
        <div className='date-published' data-testid='date-published'>
          {moment(new Date(publishedAt)).format('MM/DD/YYYY')}
        </div>
      </div>
    </div>
  )
}