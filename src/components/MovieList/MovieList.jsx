import { Link, useLocation } from 'react-router-dom';
import style from './MovieList.module.css';

const MovieList = ({ results }) => {
  const location = useLocation();

  return (
    <ul className={style.results}>
      {results.map((movie) => (
        <li key={movie.id} className={style.movie_list_item}>
          <button></button>
          <Link to={`/movies/${movie.id}`} state={location}>
            <div className={style.item_container}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={style.movi_poster}
              />
              <div className={style.name_container}>
                <p className={style.movie_title}>{movie.title}</p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
