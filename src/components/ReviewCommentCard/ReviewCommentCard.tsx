import * as React from 'react';
import './ReviewCommentCard.scss';
import { CommentProps } from '../ReviewCard/ReviewDetailsCard/ReviewDetailsCard';

export default function ReviewCommentCard(props: CommentProps) {
  const {
    username,
    description,
    date
  } = props; 

  return (
    <div className='review-comment-card-container'>
      <div>
        {username}
      </div>
      <div>
        {description}
      </div>
      <div>
        {date}
      </div>
    </div>
  )
}