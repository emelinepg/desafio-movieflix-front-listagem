import { useReviewContext } from 'ReviewContext';
import axios from 'axios';
import ReviewItem from 'components/ReviewItem';
import { useEffect, useState } from 'react';
import { Review } from 'types/review';
import { BASE_URL } from 'utils/requests';

type Props = {
  movieId: string;
};

const ReviewList = ({ movieId }: Props) => {

    const {isSubmitted} = useReviewContext();
  const [reviewList, setReviewList] = useState<Review[]>([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movies/${movieId}/reviews`)
      .then((response) => {
        setReviewList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieId, isSubmitted]);

  return (
    <div>
      {reviewList.map((reviewItem) => (
        <div key={reviewItem.id}>
          <ReviewItem review={reviewItem} />
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
