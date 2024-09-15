import { useSelector } from 'react-redux';
import { selectToken } from '../../redux/firebaseAuth/selectors';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getMoviesFromCollection, removeFromWatchLater } from '../../firebase/firebase';
import style from './CollectionPage.module.css';
import BackButton from '../../components/BackButton/BackButton';
import { FaMinusCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
const CollectionPage = () => {
  const uid = useSelector(selectToken);
  const { collectionId } = useParams(); // Витягування collectionId з параметрів URL
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const backLink = useRef(location.state || '/');

  useEffect(() => {
    const getMovies = async () => {
      try {
        console.log('Fetching movies for userId:', uid, 'and collectionId:', collectionId);
        if (uid && collectionId) {
          const data = await getMoviesFromCollection(uid, collectionId);
          console.log('Fetched movies:', data);
          setMovies(data);
        } else {
          console.error('UID or collectionId is missing');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [uid, collectionId]);

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
    <div>
      <BackButton props={backLink.current} />
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
    </div>
  );
};

export default CollectionPage;
