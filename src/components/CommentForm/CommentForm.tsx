import * as React from 'react';
import { isEmpty } from 'lodash';

export interface CommentFormProps {
  onChange: (username: string, description: string, showCommentForm: boolean) => void;
  buttonDisabled: boolean;
  buttonText: string;
  username?: string;
  description?: string;
}

export default function CommentForm(props: CommentFormProps) {
  const {
    onChange,
    username,
    description,
    buttonText,
  } = props; 
  
  const [comment, setComment] = React.useState({
    commentUsername: '',
    commentDescription:''
  });

  const {
    commentUsername,
    commentDescription
  } = comment;

  const form = () => {
    return (
      <>
        <input
          data-testid='username'
          placeholder='username'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>  {
            setComment({...comment, commentUsername: event.target.value})
          }}
          defaultValue={username || ''}
        >
        </input>
        <input
          data-testid='description'
          placeholder='description'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>  {
            setComment({...comment, commentDescription: event.target.value})
          }}
          defaultValue={description || ''}
        >
        </input>
      </>
    );
  }

  return (
    <div>
      {form()}
      <button
        data-testid='submit-comment-button'
        className='submit-comment-button'
        disabled={isEmpty(commentUsername) || isEmpty(commentDescription)}
        onClick={() => {
          onChange(commentUsername, commentDescription, false);
        }}
      >
        {buttonText}
      </button>
      <button
        data-testid='button'
        className='submit-comment-button'
        onClick={() => {
          onChange('', '', false);
        }}
      >
        cancel
      </button>
    </div>
  )
}