import * as React from 'react';
import './ReviewCard.scss';
import ReviewCardModal, { ReviewCardModalProps } from '../ReviewCardModal/ReviewCardModal';
import { CommentProps } from './ReviewDetailsCard/ReviewDetailsCard';
import { range } from 'lodash';
import moment from 'moment';

export interface ReviewCardProps {
  id: string;
  author: string;
  place: string;
  publishedAt: string;
  rating: number;
  content: string;
  comment: CommentProps;
}

export default function ReviewCard(props: ReviewCardProps) {
  const [showDetailsView, setShowDetailsView] = React.useState<boolean>(false);

  const {
    author, 
    place,
    publishedAt,
    rating,
    content,
    comment,
    id
  } = props; 

  const reviewCardModalProps: ReviewCardModalProps = {
    author, 
    place,
    publishedAt,
    rating,
    content,
    comment,
    showDetailsView,
    id,
    onRequestClose: () => setShowDetailsView(!showDetailsView)
  }

  return showDetailsView ? <ReviewCardModal {...reviewCardModalProps} /> : (
    <div 
      className='review-card-container'
      role='button'
      onClick={() => setShowDetailsView(!showDetailsView)}
    >
      <div className='place'>
        {place}
      </div>
      <div className='rating'>
        {range(rating).map((rating) => <>	&#x2605;</>)}
      </div>
      <div className='description'>
        {content}
      </div>
      <div className='review-card-footer'>
        <div className='author'>
          {author}
        </div>
        <div className='date-published'>
          {moment(publishedAt).format('MM/DD/YYYY')}
        </div>
      </div>
    </div>
  )
}