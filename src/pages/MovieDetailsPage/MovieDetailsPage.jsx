import { useParams, Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { getMovieDetails } from "../../getMovies/getMovies";
import { useEffect, useState, useMemo } from "react";
import styles from './MovieDetailsPage.module.css';
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import clsx from "clsx";
import { Toaster } from "react-hot-toast";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const getDetails = async (id) => {
      try {
        setLoading(true);
        
        const data = await getMovieDetails(id);
        setDetails(data);
      } catch (error) {
        setError(true);
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      getDetails(movieId);
    }
  }, [movieId]);

  const memoizedDetails = useMemo(() => details, [details]);
  const memoizedLoading = useMemo(() => loading, [loading]);
  const memoizedError = useMemo(() => error, [error]);

  return (
    <>
      <button className={clsx(memoizedError ? styles.none : styles.ok)}>
        <Link to={location.state?.pathname + location.state?.search || '/'}>Go back</Link>
      </button>
      {memoizedLoading && <p>Loading...</p>}
      {memoizedError && <NotFoundPage />}
      {!memoizedError && (
        <div className={styles.container}>
          <img 
            className={styles.movie_img}
            src={`https://image.tmdb.org/t/p/w500${memoizedDetails.poster_path}`}
            alt={memoizedDetails.title} 
          />
          <div>
            <h2>{memoizedDetails.title}</h2>
            <p>User Score: {memoizedDetails.vote_average ? Math.ceil(memoizedDetails.vote_average * 10) : 0}%</p>
            <h3>Overview</h3>
            <p>{memoizedDetails.overview}</p>
            <h3>Genres</h3>
            {memoizedDetails.genres && memoizedDetails.genres.length > 0 ? (
              <div className={styles.genre_container}>
                {memoizedDetails.genres.map((genre) => (
                  <p key={genre.id}>{genre.name}</p>
                ))}
              </div>
            ) : (
              <p>No genres available</p>
            )}
          </div>
        </div>
      )}
      <div className={clsx(memoizedError ? styles.none : styles.ok)}>
        <p>Additional information</p>
        <ul>
          <li><NavLink to='cast'>Cast</NavLink></li>
          <li><NavLink to='reviews'>Reviews</NavLink></li>
        </ul>
      </div>
      <Outlet />
      <Toaster />
    </>
  );
};

export default MovieDetailsPage;
