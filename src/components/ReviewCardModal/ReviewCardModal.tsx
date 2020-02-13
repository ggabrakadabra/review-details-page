import * as React from 'react';
import ReviewDetailsCard, { ReviewDetailsCardProps, CommentProps } from '../ReviewDetailsCard/ReviewDetailsCard';
import ReactModal from 'react-modal';
import './ReviewCardModal.scss'
import ReviewCard from '../ReviewCard/ReviewCard';

export interface ReviewCardModalProps {
  id: string;
  author: string;
  place: string;
  publishedAt: string;
  rating: number;
  content: string;
  comment: CommentProps;
}

export default function ReviewCardModal(props: ReviewCardModalProps) {
  const [showDetailsView, setShowDetailsView] = React.useState<boolean>(false);

  const {
    author, 
    place,
    publishedAt,
    rating,
    content,
    id,
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
    onRequestClose: () => setShowDetailsView(!showDetailsView),
    className: 'modal',
    overlayClassName: 'modal-overlay',
    ariaHideApp: false
  }

  const reviewCardModal = () => {
    return (
      <ReactModal {...defaultReactModalProps} > 
          <ReviewDetailsCard {...reviewDetailsProps} />
      </ReactModal>
    );
  }

  const reviewCard = () => {
    return (
      <div 
        className='review-card-container'
        data-testid='review-card-container'
        role='button'
        onClick={() => setShowDetailsView(!showDetailsView)}
      >
        <ReviewCard key={id} {...props}/>
      </div>
    )
  }

  return showDetailsView ? reviewCardModal() : reviewCard();
}