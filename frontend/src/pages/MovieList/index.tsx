import { Movie } from 'types/movie';
import './styles.css';
import MovieCard from 'components/MovieCard';
import { SpringPage } from 'types/vendor/spring';
import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'utils/requests';
import { Link } from 'react-router-dom';
import Pagination from 'components/Pagination';
import GenreFilter, { GenreFilterData } from 'components/GenreFilter';

type ControlComponentsData = {
  activePage: number;
  filterData: GenreFilterData;
};

const MovieList = () => {
  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { genre: null },
    });

  const [page, setPage] = useState<SpringPage<Movie>>();

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
      filterData: controlComponentsData.filterData,
    });
  };

  const handleSubmitFilter = (data: GenreFilterData) => {
    setControlComponentsData({ activePage: 0, filterData: data });
  };

  const getMovies = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      params: {
        page: controlComponentsData.activePage,
        size: 4,
        genreId: controlComponentsData.filterData.genre?.id,
      },
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentsData]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <>
      <div className="container movie-list-container">
        <div className="base-card filter-container">
          <GenreFilter onSubmitFilter={handleSubmitFilter} />
        </div>
        <div className="row">
          {page?.content.map((movie) => (
            <div className="col-sm-6 col-xl-3" key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <MovieCard movie={movie} />
              </Link>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="pagination-container">
            <Pagination
              pageCount={page ? page.totalPages : 0}
              range={3}
              onChange={handlePageChange}
              forcePage={page?.number}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieList;
