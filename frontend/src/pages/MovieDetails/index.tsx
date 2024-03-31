import ReviewCard from 'components/ReviewCard';
import './styles.css';
import { hasAnyRoles } from 'utils/auth';
import ReviewList from 'components/ReviewList';
import { useParams } from 'react-router-dom';
import { ReviewProvider } from 'ReviewContext';
import MovieDetailsCard from 'components/MovieDetailsCard';

type UrlParams = {
  movieId: string;
};

const MovieDetails = () => {
  const { movieId } = useParams<UrlParams>();
  return (
    <ReviewProvider>
      <div className="details-container">
        <div className="container my-4 cards-container">
          <div>
            <MovieDetailsCard />
          </div>
          <div className="px-0">
            {hasAnyRoles(['ROLE_MEMBER']) && <ReviewCard />}
          </div>
          <div className="base-card review-list">
            <ReviewList movieId={movieId} />
          </div>
        </div>
      </div>
    </ReviewProvider>
  );
};

export default MovieDetails;
