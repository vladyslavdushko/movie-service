import { Suspense, useRef } from 'react';
import { useParams, Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { getMovieDetails } from '../../getMovies/getMovies';
import { useEffect, useState } from 'react';
import styles from './MovieDetailsPage.module.css';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import clsx from 'clsx';
import { Toaster } from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';

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
        console.error('Error fetching movie details:', error);
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

  const backdropUrl = details.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${details.backdrop_path}`
    : null;

  const backdropStyle = {
    backgroundImage: backdropUrl
      ? `linear-gradient(rgba(46, 47, 66, 0.9), rgba(46, 47, 66, 0.8)), url(${backdropUrl})`
      : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    left: 0,
    top: 0,
    height: '100%',
    zIndex: -1,
    margin: '0 auto'
  };

  return (
    <div className={styles.sbackdrop_container}>
      <div className="container">
        <Link to={backLink.current}>
          <button className={clsx('back-button', error ? styles.none : styles.ok)}>Go back</button>
        </Link>
        {loading && <Loader />}
        {error && <NotFoundPage />}
        {!error && !loading && (
          <>
            <div className={styles.container} style={backdropStyle}>
              {details.poster_path && (
                <img
                  className={styles.movie_img}
                  src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                  alt={details.title}
                />
              )}
              <div className={styles.overview_container}>
                <h3 className={styles.movie_title}>
                  {details.title} ({releaseYear})
                </h3>
                <p className={styles.tagline}>{details.tagline}</p>
                <p>
                  User Score: {details.vote_average ? Math.ceil(details.vote_average * 10) : 0}%
                </p>
                <progress
                  className={styles.progressBar}
                  value={details.vote_average ? userScore * 0.01 : null}
                />
                <h4 className={styles.movie_title}>Overview</h4>
                <p className={styles.overview}>{details.overview}</p>
                <h4 className={styles.movie_title}>Genres</h4>
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
              <h3 className={styles.additiona_information}>Additional information</h3>
              <ul className={styles.outlet_ul}>
                <li>
                  <NavLink to="cast">Cast</NavLink>
                </li>
                <li>
                  <NavLink to="reviews">Reviews</NavLink>
                </li>
              </ul>
            </div>
          </>
        )}
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
        <Toaster />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
