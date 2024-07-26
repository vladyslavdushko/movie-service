import { useParams, Link, NavLink, Outlet} from "react-router-dom";
import { getMovieDetails } from "../../getMovies/getMovies";
import { useEffect, useState } from "react";
import styles from './MovieDetailsPage.module.css';
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getDetails = async (id) => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        setDetails(data);
      } catch (error) {
        setError(true)
        console.error("Error fetching movie details:", error);
      } finally {
    
        setLoading(false);
      }
    };

    if (movieId) {
      getDetails(movieId);
    }
  }, [movieId]);


  return (
    <>
      <button><Link to='/'>Go back</Link></button>
      {loading && <p>Loading...</p>}
      {error && <NotFoundPage />}
        {!error && <div className={styles.container}>
        <img 
        className={styles.movie_img}
          src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
          alt={details.title} 
        />
        <div>
          <h2>{details.title}</h2>
          <p>User Score: {details.vote_average ? Math.ceil( details.vote_average * 10) : 0}%</p>
          <h3>Overview</h3>
          <p>{details.overview}</p>
          <h3>Genres</h3>
          {details.genres && details.genres.length > 0 ? (
            <div className={styles.genre_container}>
              {details.genres.map((genre) => (
                <p key={genre.id}>{genre.name}</p>
              ))}
            </div>
          ) : (
            <p>No genres available</p>
          )}
        </div>
      </div>}
      <p>Additional information</p>
      <ul>
        <li><NavLink to='cast' >Cast</NavLink></li>
        <li><NavLink to='reviews'>Reviews</NavLink></li>
      </ul>
    <Outlet/>
    </>
  );
};

export default MovieDetailsPage;
