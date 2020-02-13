import * as React from 'react';

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
  
  const [isEditing, setIsEditing] = React.useState(false);
  const [comment, setComment] = React.useState({
    commentUsername: '',
    commentDescription:''
  })
  const {
    commentUsername,
    commentDescription
  } = comment;

  const form = () => {
    return (
      <>
        <input
          placeholder='username'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>  {
            setComment({...comment, commentUsername: event.target.value})
          }}
          defaultValue={username || ''}
        >
        </input>
        <input
          placeholder='description'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>  {
            setComment({...comment, commentDescription: event.target.value})
          }}
          defaultValue={description || ''}
        >
        </input>
      </>
    )
  }

  return (
    <div>
      {form()}
      <button
        className='submit-comment-button'
        onClick={() => {
          console.log('in onclick for submit form')
          onChange(commentUsername, commentDescription, isEditing);
          setIsEditing(!isEditing);
        }}
      >
        {buttonText}
      </button>
    </div>
  )
}