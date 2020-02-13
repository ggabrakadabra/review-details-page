import * as React from 'react';
import ReviewCommentCard, { ReviewCommentCardProps } from '../../ReviewCommentCard/ReviewCommentCard';
import moment from 'moment';
import { isNil, isEmpty } from 'lodash';
import './ReviewDetailsCard.scss';

export interface CommentProps {
  username: string;
  description: string;
  date: string;
}

export interface ReviewDetailsCardProps {
  id: string;
  author: string;
  place: string;
  publishedAt: string;
  rating: number;
  content: string;
  comment: CommentProps
}

export default function ReviewDetailsCard(props: ReviewDetailsCardProps) {
  const {
    author, 
    place,
    publishedAt,
    rating,
    content,
    comment,
    id
  } = props; 

  const [reviewResponse, setReviewResponse] = React.useState<CommentProps>({
    username: !isNil(comment) ? comment.username : '',
    description: !isNil(comment) ? comment.description : '',
    date: !isNil(comment) ? comment.date :  moment().format('dddd, MMMM DD, h:mm a z').toString(),
  });
  const [showCommentForm, setShowCommentForm] = React.useState<boolean>(false);
  const [reviewHasComment, setReviewHasComment] = React.useState<boolean>(!isNil(comment));
  async function addOrEditComment(editComment?: CommentProps) {
    const body = editComment ? editComment : reviewResponse
    await fetch(`http://localhost:3004/reviews/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({...props, comment: body})
    })
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      console.log(myJson.comment)
      setReviewResponse(myJson.comment);
    });
  }

  const commentCTA = () => {
    if (showCommentForm) {
      setReviewHasComment(true)
      addOrEditComment();
    }
    setShowCommentForm(!showCommentForm);
  }
  
  const commentForm = () => {
    return showCommentForm ? (
      <div>
        <input
          placeholder='username'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>  {
            setReviewResponse({...reviewResponse, username: event.target.value})
          }}
        >
        </input>
        <input
          placeholder='comment'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>  {
            setReviewResponse({...reviewResponse, description: event.target.value})
          }}
        >
        </input>
      </div>
    ) : null;
  }
  
  const ReviewCard = () => {
    return (
      <div className='review-card'>
        <div>
          {place}
        </div>
        <div>
          {publishedAt}
        </div>
        <div>
          {author}
        </div>
        <div>
          {rating}
        </div>
        <div>
          {content}
        </div>
        {!reviewHasComment ? commentForm() : null}
        {!reviewHasComment ? (
          <button
            className='submit-comment-button'
            onClick={() => commentCTA()}
            disabled={showCommentForm && (isEmpty(reviewResponse.username) || isEmpty(reviewResponse.description))}
          >
            {showCommentForm ? 'submit Comment' : 'add comment'}
          </button>
        ) : null}
      </div>
    )
  }
  const reviewCommentCardProps: ReviewCommentCardProps = {
    ...reviewResponse, 
    editComment: (username: string, description: string) => addOrEditComment({
      date: reviewResponse.date,
      username,
      description
    })
  }
  return (
    <div className='review-details-container'>
      {ReviewCard()}
      {reviewHasComment ? <ReviewCommentCard {...reviewCommentCardProps}/> : null}
    </div>
  );
}