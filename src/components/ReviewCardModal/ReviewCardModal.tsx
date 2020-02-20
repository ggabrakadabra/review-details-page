import * as React from 'react';
import ReviewDetailsCard, { ReviewDetailsCardProps, CommentProps } from '../ReviewDetailsCard/ReviewDetailsCard';
import ReactModal from 'react-modal';
import './ReviewCardModal.scss'
import ReviewCard from '../ReviewCard/ReviewCard';
import { getSingleReview } from '../../api/fetch';

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
  const [reviewProps, setReviewProps] = React.useState(props);
  const [didUpdate, setDidUpdate] = React.useState(false);

  const reviewDetailsProps: ReviewDetailsCardProps = {...reviewProps, setDidUpdate}

  const onRequestClose = async () => {
    if (didUpdate) {
      const updatedReview = await getSingleReview(props.id);
      setReviewProps(updatedReview);
    }
    setShowDetailsView(!showDetailsView);
  }

  const defaultReactModalProps = {
    isOpen: true,
    shouldCloseOnOverlayClick: true,
    shouldCloseOnEsc: true,
    onRequestClose,
    className: 'modal',
    overlayClassName: 'modal-overlay',
    ariaHideApp: false
  }

  const reviewCardModal = () => {
    return (
      <ReactModal {...defaultReactModalProps}> 
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
        <ReviewCard key={props.id} {...reviewProps}/>
      </div>
    )
  }

  return showDetailsView ? reviewCardModal() : reviewCard();
}