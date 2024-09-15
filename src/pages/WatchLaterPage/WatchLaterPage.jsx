import { useEffect, useState } from 'react';
import { getWatchLaterMovies, removeFromWatchLater } from '../../firebase/firebase';
import style from './WatchLaterPage.module.css';
import { Link, useLocation } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { useSelector } from 'react-redux';
import { selectToken } from '../../redux/firebaseAuth/selectors';
import { FaMinusCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';

const WatchLaterPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const uid = useSelector(selectToken);

  useEffect(() => {
    const fetchWatchLaterMovies = async () => {
      const movies = await getWatchLaterMovies(uid);
      setMovies(movies);
      setLoading(false);
    };

    fetchWatchLaterMovies();
  }, [uid]);

  const handleRemoveMovie = async (movieId) => {
    try {
      await removeFromWatchLater(movieId, uid);
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
      toast.success('Movie removed from watchlist');
    } catch (error) {
      throw error.message;
    }

    return;
  };

  return (
    <>
      {loading && <Loader />}
      {movies.length === 0 && (
        <h2 className={style.header}>Don`t know what to watch? Let’s go find something!</h2>
      )}
      <ul className={style.results}>
        {movies.length > 0 &&
          movies.map((movie) => (
            <li key={movie.id} className={style.movie_list_item}>
              <div>
                <FaMinusCircle
                  onClick={() => handleRemoveMovie(movie.id)}
                  className={style.remove_button}
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
    </>
  );
};

export default WatchLaterPage;
