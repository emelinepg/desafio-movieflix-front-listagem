import { Movie } from 'types/movie';
import './styles.css';

type Props = {
  movie: Movie;
};

const MovieDetailsCard = ({ movie }: Props) => {
  return (
    <div className="base-card movie-details-card-container">
      <div className="movie-details-image-container">
        <img src={movie.imgUrl} alt={movie.title} />
      </div>
      <div className="movie-details-info-container">
        <div className="movie-details-title-year-container">
          <h1>{movie.title}</h1>
          <h3>{movie.year}</h3>
          <h4>{movie.subTitle}</h4>
        </div>
        <div className="movie-details-synopsis-container">
          <p>{movie.synopsis}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsCard;
