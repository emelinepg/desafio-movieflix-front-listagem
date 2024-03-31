import ReviewCard from 'components/ReviewCard';
import './styles.css';
import { hasAnyRoles } from 'utils/auth';
import ReviewList from 'components/ReviewList';
import { useParams } from 'react-router-dom';
import { ReviewProvider } from 'ReviewContext';
import MovieDetailsCard from 'components/MovieDetailsCard';
import { Movie } from 'types/movie';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from 'utils/requests';

type UrlParams = {
  movieId: string;
};

const MovieDetails = () => {
  const { movieId } = useParams<UrlParams>();
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movies/${movieId}`)
      .then((response) => {
        setMovie(response.data);
      })
  }, [movieId]);

  return (
    <ReviewProvider>
      <div className="details-container">
        <div className="container my-4 cards-container">
          <div>
            { movie && <MovieDetailsCard movie={movie} />}
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
