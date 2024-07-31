import { useEffect, useState } from "react";
import { getCast } from "../../getMovies/getMovies";
import { useParams } from "react-router-dom";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import styles from './MovieCast.module.css'

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

  console.log(cast);
  return (
    <>
    {loading && <p>Loading...</p>}
    {cast.cast.length === 0 && <p>We don`t have cast for this movie</p>}
      <ul>
        {cast.cast.map((actor) => (
          <li key={actor.id}>
            <img 
            className={styles.actor_image}
              src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : 'https://via.placeholder.com/150'} 
              alt={actor.name} 
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieCast;
