import './styles.css';
import MovieCard from 'components/MovieCard';

const MovieList = () => {
  return (
    <div className="container my-4 movie-list-container">
      <div className="base-card filter-container">
        <h3>Filtro</h3>
      </div>
      <div className="row">
        <div className="col-sm-6 col-xl-3">
          <MovieCard />
        </div>
        <div className="col-sm-6 col-xl-3">
          <MovieCard />
        </div>
        <div className="col-sm-6 col-xl-3">
          <MovieCard />
        </div>
        <div className="col-sm-6 col-xl-3">
          <MovieCard />
        </div>
      </div>
      <div className="row">
        <h3>Pagination</h3>
      </div>
    </div>
  );
};

export default MovieList;
