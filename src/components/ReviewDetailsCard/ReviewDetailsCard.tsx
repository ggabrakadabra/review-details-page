import * as React from 'react';
import ReviewCommentCard, { ReviewCommentCardProps } from '../ReviewCommentCard/ReviewCommentCard';
import moment from 'moment';
import { isNil, isEmpty } from 'lodash';
import './ReviewDetailsCard.scss';
import CommentForm, { CommentFormProps } from '../CommentForm/CommentForm';
import ReviewCard, { ReviewCardProps } from '../ReviewCard/ReviewCard';
import classnames from 'classnames';

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

  async function addOrEditComment(username: string, description: string) {
    const editComment = {
      date: reviewResponse.date,
      username,
      description
    }
    const body = !isEmpty(username) ? editComment : reviewResponse
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
      console.log(myJson.comment);
      setReviewResponse(myJson.comment);
    });
  }

  const commentCTA = (username: string, description: string, isEditing: boolean) => {
    if (showCommentForm) {
      setReviewHasComment(true);
      addOrEditComment(username, description);
    }
    setShowCommentForm(isEditing);
  }

  const commentFormProps: CommentFormProps = {
    onChange: (username: string, description: string, isEditing: boolean) => commentCTA(username, description, isEditing),
    username: reviewResponse.username,
    description: reviewResponse.description,
    buttonText: showCommentForm ? 'submit Comment' : 'add comment',
    buttonDisabled: showCommentForm && (isEmpty(reviewResponse.username) || isEmpty(reviewResponse.description))
  }
  const reviewCardProps: ReviewCardProps = {
    author,
    place,
    publishedAt,
    rating,
    content
  }

  const reviewCommentCardProps: ReviewCommentCardProps = {
    ...reviewResponse, 
    editComment: (username: string, description: string) => addOrEditComment(username,description)
  }

  const reviewDetailsContainerClasses = classnames('review-details-container', {
    'no-comment': !reviewHasComment
  })

  return (
    <div className={reviewDetailsContainerClasses}>
        <ReviewCard {...reviewCardProps} />
        {!reviewHasComment && showCommentForm ? <CommentForm {...commentFormProps} /> : null}
        {!reviewHasComment && !showCommentForm ? (
          <button
            className='submit-comment-button'
            onClick={() => commentCTA('', '', true)}
            disabled={showCommentForm && (isEmpty(reviewResponse.username) || isEmpty(reviewResponse.description))}
          >
            {showCommentForm ? 'submit Comment' : 'add comment'}
          </button>
        ) : null}
      {reviewHasComment ? <ReviewCommentCard {...reviewCommentCardProps}/> : null}
    </div>
  );
}