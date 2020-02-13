import * as React from 'react';
import ReviewDetailsCard, { ReviewDetailsCardProps, CommentProps } from '../ReviewCard/ReviewDetailsCard/ReviewDetailsCard';
import ReactModal from 'react-modal';
import './ReviewCardModal.scss'

export interface ReviewCardModalProps {
  id: string;
  author: string;
  place: string;
  publishedAt: string;
  rating: number;
  content: string;
  comment: CommentProps;
  showDetailsView: boolean;
  onRequestClose: (showDetailsView: boolean) => void
}

export default function ReviewCardModal(props: ReviewCardModalProps) {
  const {
    author, 
    place,
    publishedAt,
    rating,
    content,
    id,
    showDetailsView,
    onRequestClose,
    comment
  } = props; 

  const reviewDetailsProps: ReviewDetailsCardProps = {
    author, 
    place,
    publishedAt,
    rating,
    content,
    comment,
    id
  }
  const defaultReactModalProps = {
    isOpen: true,
    shouldCloseOnOverlayClick: true,
    shouldCloseOnEsc: true,
    onRequestClose: () => onRequestClose(!showDetailsView),
    className: 'modal',
    overlayClassName: 'modal-overlay',
    ariaHideApp: false
  }

  return (
    <ReactModal {...defaultReactModalProps} > 
      <div className='modal-review-card-container'>
        <ReviewDetailsCard {...reviewDetailsProps} />
      </div>
    </ReactModal>
  )
}