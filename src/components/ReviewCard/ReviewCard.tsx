import * as React from 'react';
import './ReviewCard.scss';
import ReviewCardModal, { ReviewCardModalProps } from '../ReviewCardModal/ReviewCardModal';
import { CommentProps } from './ReviewDetailsCard/ReviewDetailsCard';

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
      <div>
        {place}
      </div>
      <div>
        {publishedAt}
      </div>
      <div>
        {author}
      </div>
    </div>
  )
}