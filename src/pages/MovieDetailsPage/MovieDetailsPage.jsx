import { Suspense, useRef } from "react";
import { useParams, Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { getMovieDetails } from "../../getMovies/getMovies";
import { useEffect, useState } from "react";
import styles from './MovieDetailsPage.module.css';
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import clsx from "clsx";
import { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLink = useRef(location.state || '/');

  useEffect(() => {
    const getDetails = async (id) => {
      try {
        setLoading(true);
        setError(false);
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
  const userScore = Math.ceil(details.vote_average * 10);
  const releaseYear = details.release_date ? details.release_date.slice(0, 4) : 'N/A';
console.log(details);
  return (
    <div className="container">
      <>
        <button className={clsx('back-button',error ? styles.none : styles.ok)}>
          <Link to={backLink.current} >Go back</Link>
        </button>
        {loading && <Loader />}
        {error && <NotFoundPage />}
        {!error && !loading && (
          <>
            <div className={styles.container}>
              {details.poster_path && (
                <img
                  className={styles.movie_img}
                  src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                  alt={details.title}
                />
              )}
              <div>
                <h3 className={styles.movie_title}>{details.title} ({releaseYear})</h3>
                <p className={styles.tagline}>{details.tagline}</p>
                <p>User Score: {details.vote_average ? Math.ceil(details.vote_average * 10) : 0}%</p>
                <progress className={styles.progressBar} value={details.vote_average ? userScore * 0.01 : null} />
                <h2 className={styles.movie_title}>Overview</h2>
                <p>{details.overview}</p>
                <h2 className={styles.movie_title}>Genres</h2>
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
            </div>
            <div className={styles.additionalInfo}>
              <h3 className={styles.movie_title}>Additional information</h3>
              <ul>
                <li><NavLink to='cast'>Cast</NavLink></li>
                <li><NavLink to='reviews'>Reviews</NavLink></li>
              </ul>
            </div>
          </>
        )}
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
        <Toaster />
      </>
    </div>
  );
};

export default MovieDetailsPage;
