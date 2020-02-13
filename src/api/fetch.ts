import moment from "moment";
import { isEmpty } from "lodash";
import { CommentProps, ReviewDetailsCardProps } from "../components/ReviewDetailsCard/ReviewDetailsCard";

export async function getReviews() {
  const response = await fetch('http://localhost:3004/reviews', {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  return await response.json();
}

export async function addOrEditComment(
  username: string, 
  description: string, 
  reviewResponse: CommentProps, 
  reviewProps: ReviewDetailsCardProps
  ) {
  const editComment = {
    date: moment().format().toString(),
    username,
    description
  }
  const body = !isEmpty(username) ? editComment : reviewResponse;
  const props = {
    id: reviewProps.id,
    author: reviewProps.author,
    place: reviewProps.place,
    published_at: reviewProps.publishedAt,
    rating: reviewProps.rating,
    content: reviewProps.content,
    comment: reviewProps.comment
  }
  const newReview = await fetch(`http://localhost:3004/reviews/${reviewProps.id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify({...props, comment: body})
  });
  return await newReview.json();
}