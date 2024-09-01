import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../getMovies/getMovies';
import styles from './Movies.module.css';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <>
      <div className="container">
        <h1 className={styles.header}>Trending today</h1>
        {loading && <Loader className={styles.loader} />}
        {error && <ErrorMessage error={error} />}
        <MovieList results={movies} />
      </div>
    </>
  );
};

export default HomePage;
