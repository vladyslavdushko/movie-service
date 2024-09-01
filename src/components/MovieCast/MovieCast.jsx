import { useEffect, useState } from 'react';
import { getCast } from '../../getMovies/getMovies';
import { useParams } from 'react-router-dom';
import styles from './MovieCast.module.css';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState({ cast: [] });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCastById = async (id) => {
      try {
        setLoading(true);
        const data = await getCast(id);
        setCast(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      getCastById(movieId);
    }
  }, [movieId]);

  return (
    <>
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {!loading && !error && cast.cast.length === 0 && <p>We don`t have cast for this movie</p>}
      <ul className={styles.cast_ul}>
        {cast.cast.map((actor) => (
          <li className={styles.cast_ul_li} key={actor.id}>
            <div className={styles.cast_inner_container}>
              <img
                className={styles.actor_image}
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : 'https://via.placeholder.com/150'
                }
                alt={actor.name}
              />
              <div className={styles.cast_text_container}>
                <p>{actor.name}</p>
                <p>Character: {actor.character}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieCast;
