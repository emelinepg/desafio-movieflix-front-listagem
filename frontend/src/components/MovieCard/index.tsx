import { Movie } from 'types/movie';
import './styles.css';

const MovieCard = () => {
  const movie: Movie = {
    id: 1,
    title: 'Bob Esponja',
    subTitle: 'O Incrível Resgate',
    year: 2020,
    imgUrl:
      'https://image.tmdb.org/t/p/w533_and_h300_bestv2/wu1uilmhM4TdluKi2ytfz8gidHf.jpg',
    synopsis:
      'Onde está Gary? Segundo Bob Esponja, Gary foi "caracolstrado" pelo temível Rei Poseidon e levado para a cidade perdida de Atlantic City. Junto a Patrick Estrela, ele sai em uma missão de resgate ao querido amigo, e nesta jornada os dois vão conhecer novos personagens e viver inimagináveis aventuras.',
    genre: {
      id: 1,
      name: 'Comédia',
    },
  };

  return (
    <div className="base-card movie-card-container">
      <div className="movie-image-container">
        <img src={movie.imgUrl} alt={movie.title} />
      </div>
      <div className="movie-info-container">
          <h1>{movie.title}</h1>
          <h3>{movie.year}</h3>
          <h4>{movie.subTitle}</h4>
      </div>
    </div>
  );
};

export default MovieCard;
