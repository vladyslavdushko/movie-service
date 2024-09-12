import { Link, useLocation } from 'react-router-dom';
import style from './MovieList.module.css';
import { FaPlusCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectIsLoggedInFire, selectToken } from '../../redux/firebaseAuth/selectors';
import { addToWatchLater } from '../../firebase/firebase';
import toast from 'react-hot-toast';

const MovieList = ({ results }) => {
  const location = useLocation();
  const uid = useSelector(selectToken);
  const isLoggedIn = useSelector(selectIsLoggedInFire);
  const handleAddMovie = async (movieId, title, poster_path) => {
    if (!isLoggedIn) {
      toast.error('Please login');
    }
    const movieData = {
      id: movieId,
      title: title,
      poster_path: poster_path,
      uid: uid
    };
    try {
      await addToWatchLater(movieData, uid);
      toast.success('Movie added to watchlist');
    } catch (error) {
      throw error.message;
    }
  };
  return (
    <ul className={style.results}>
      {results.map((movie) => (
        <li key={movie.id} className={style.movie_list_item}>
          <div>
            <FaPlusCircle
              onClick={() => handleAddMovie(movie.id, movie.title, movie.poster_path)}
              className={style.add_button}
            />
          </div>
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
