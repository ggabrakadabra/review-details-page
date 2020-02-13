import React from 'react';
import { render } from '@testing-library/react';
import CommentForm, { CommentFormProps } from './CommentForm';

const setup = () => {
  const defaultProps: CommentFormProps = {
    onChange: () => {},
    buttonDisabled: false,
    buttonText: 'button',
  }

  const utils = render(<CommentForm {...defaultProps} />);

  const usernameInput = utils.getByTestId('username') as HTMLInputElement;
  const descriptionInput = utils.getByTestId('description') as HTMLInputElement;
  const submitButton = utils.getByTestId('submit-comment-button') as HTMLFormElement;

  return {
    usernameInput,
    descriptionInput,
    submitButton,
    ...utils,
  };
};

describe('CommentForm', () => {
  it('renders username and description input', () => {
    const {usernameInput, descriptionInput } = setup();
    expect(usernameInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
  });
});