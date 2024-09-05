import { useEffect, useState } from 'react';
import { auth, getWatchLaterMovies } from '../../firebase/firebase';
import style from './WatchLaterPage.module.css';
import { Link, useLocation } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
const WatchLaterPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchWatchLaterMovies = async () => {
      const user = auth.currentUser;

      if (user) {
        try {
          const movies = await getWatchLaterMovies(user.uid);
          setMovies(movies);
        } catch (error) {
          console.error('Failed to fetch movies:', error);
        }
      } else {
        console.log('No user is logged in');
      }

      setLoading(false);
    };

    fetchWatchLaterMovies();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <ul className={style.results}>
        {movies.map((movie) => (
          <li key={movie.id} className={style.movie_list_item}>
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
