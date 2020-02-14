import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CommentForm, { CommentFormProps } from './CommentForm';

const setup = (props: CommentFormProps) => {
  const utils = render(<CommentForm {...props} />);

  const usernameInput = utils.getByTestId('username') as HTMLInputElement;
  const descriptionInput = utils.getByTestId('description') as HTMLInputElement;
  const submitButton = utils.getByTestId('submit-comment-button') as HTMLFormElement;
  const cancelButton = utils.getByTestId('button') as HTMLFormElement;

  return {
    usernameInput,
    descriptionInput,
    submitButton,
    cancelButton,
    ...utils,
  };
};

describe('CommentForm', () => {
  it('renders username and description input', () => {
    const defaultProps: CommentFormProps = {
      onChange: jest.fn(),
      buttonDisabled: false,
      buttonText: 'button',
    }
    const {usernameInput, descriptionInput } = setup(defaultProps);
    expect(usernameInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
  });

  it('will call onChange prop with correct arguments', () => {
    const defaultProps: CommentFormProps = {
      onChange: jest.fn(),
      buttonDisabled: false,
      buttonText: 'button',
      username: 'foooo',
      description: 'barrrr'
    }
    const { submitButton, cancelButton } = setup(defaultProps);

    fireEvent.click(cancelButton);
    expect(defaultProps.onChange).toHaveBeenCalledWith('', '', false);

    fireEvent.click(submitButton)
    expect(defaultProps.onChange).toHaveBeenCalledWith('foooo', 'barrrr', false);
  });
});