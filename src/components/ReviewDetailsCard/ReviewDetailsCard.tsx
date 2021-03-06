import * as React from 'react';
import ReviewCommentCard, { ReviewCommentCardProps } from '../ReviewCommentCard/ReviewCommentCard';
import moment from 'moment';
import { isNil, isEmpty, get } from 'lodash';
import './ReviewDetailsCard.scss';
import CommentForm, { CommentFormProps } from '../CommentForm/CommentForm';
import ReviewCard, { ReviewCardProps } from '../ReviewCard/ReviewCard';
import classnames from 'classnames';
import { addOrEditComment } from '../../api/fetch';

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
  comment: CommentProps;
  setDidUpdate: (didUpdate: boolean) => void;
}

export default function ReviewDetailsCard(props: ReviewDetailsCardProps) {
  const {
    author, 
    place,
    publishedAt,
    rating,
    content,
    comment,
    setDidUpdate
  } = props; 

  const [reviewResponse, setReviewResponse] = React.useState<CommentProps>({
    username: !isNil(comment) ? comment.username : '',
    description: !isNil(comment) ? comment.description : '',
    date: !isNil(comment) ? comment.date :  moment().format('dddd, MMMM DD, h:mm a z').toString(),
  });
  const [showCommentForm, setShowCommentForm] = React.useState<boolean>(false);
  const [reviewHasComment, setReviewHasComment] = React.useState<boolean>(!isEmpty(get(comment, 'description', '')));

  async function updateReviewComment(
    username: string, 
    description: string
    ) {
      const updatedReview = await addOrEditComment(username, description, reviewResponse, props);
      setReviewResponse(updatedReview.comment);
  }

  const commentCTA = (username: string, description: string, isEditing: boolean) => {
    if (showCommentForm && !isEmpty(username)) {
      setReviewHasComment(true);
      setDidUpdate(true)
      updateReviewComment(username, description);
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
    editComment: (username: string, description: string) => updateReviewComment(username, description)
  }

  const reviewDetailsContainerClasses = classnames('review-details-container', {
    'no-comment': !reviewHasComment
  })

  return (
    <div className={reviewDetailsContainerClasses} data-testid='review-details-card'>
        <ReviewCard {...reviewCardProps} />
        {!reviewHasComment && showCommentForm ? <CommentForm {...commentFormProps} /> : null}
        {!reviewHasComment && !showCommentForm ? (
          <button
            className='submit-comment-button'
            data-testid='submit-comment-button'
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