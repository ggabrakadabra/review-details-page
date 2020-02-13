import * as React from 'react';
import './ReviewCommentCard.scss';
import { CommentProps } from '../ReviewDetailsCard/ReviewDetailsCard';
import CommentForm, { CommentFormProps } from '../CommentForm/CommentForm';
import { isEmpty } from 'lodash';
import moment from 'moment';

export interface ReviewCommentCardProps extends CommentProps {
  editComment: (username: string, description: string, showCommentForm: boolean) => void;
}

export default function ReviewCommentCard(props: ReviewCommentCardProps) {
  const {
    username,
    description,
    date,
    editComment
  } = props; 

  const [isEditing, setIsEditing] = React.useState(false);
  const onChange = (username: string, description: string, showCommentForm: boolean) => {
    if (isEmpty(username) || isEmpty(description)) {
      setIsEditing(showCommentForm);
    } else {
      setIsEditing(showCommentForm);
      editComment(username, description, showCommentForm);
    }
  }
  const commentFormProps: CommentFormProps = {
    username,
    description,
    onChange: onChange,
    buttonDisabled: (isEmpty(username) || isEmpty(description)),
    buttonText: 'edit',
  }

  return (
    <div className='review-comment-card-container'>
      {!isEditing ? (
        <>
          <div className='description'>
            {description}
            {!isEditing ? (
            <button
              onClick={() => editComment && setIsEditing(!isEditing)}
            >
              edit comment
            </button>) : null}
          </div>
          <div className='review-card-footer'>
            <div className='author'>
              {username}
            </div>
            <div className='date-published'>
              {moment(new Date(date)).format('MM/DD/YYYY')}
            </div>
          </div>
        </>
      ) : <CommentForm {...commentFormProps} />}
    </div>
  );
}