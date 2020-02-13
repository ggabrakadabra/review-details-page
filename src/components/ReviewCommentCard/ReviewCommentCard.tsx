import * as React from 'react';
import './ReviewCommentCard.scss';
import { CommentProps } from '../ReviewCard/ReviewDetailsCard/ReviewDetailsCard';
import CommentForm, { CommentFormProps } from '../CommentForm/CommentForm';
import { isEmpty } from 'lodash';

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
          <div>
            {username}
          </div>
          <div>
            {description}
          </div>
          <div>
            {date}
          </div>
        </>
      ) : <CommentForm {...commentFormProps} />}
      {!isEditing ? (<button
        onClick={() => editComment && setIsEditing(!isEditing)}
      >
        edit comment
      </button>) : null}
    </div>
  );
}