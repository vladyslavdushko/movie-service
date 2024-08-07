import style from './MoviesPage.module.css';
import { FiSearch } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState, useCallback } from 'react';
import { searchMovie } from '../../getMovies/getMovies';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [results, setResults] = useState([]);
  const [params, setParams] = useSearchParams();
  const searchQuery = params.get('query');

  const searchMovieByKeyWord = useCallback(async (query) => {
    try {
      setLoader(true);
      setError(null);
      const data = await searchMovie(query);
      setResults(data.results);
    } catch (error) {
      setError(error.message);
      toast.error("Error fetching movies");
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setQuery(searchQuery);
      searchMovieByKeyWord(searchQuery);
    }
  }, [searchQuery, searchMovieByKeyWord]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      return toast.error("Please enter a search query.");
    }
    searchMovieByKeyWord(query);
    params.set('query', query);
    setParams(params);
  };

  return (
    <div>
      <h2 className={style.header}>Let`s search movies!</h2>
      <form className={style.form} onSubmit={handleSubmit}>
        <button className={style.button} type="submit">
          <FiSearch size="16px" />
        </button>
        <input
          className={style.input}
          placeholder="What do you want to find?"
          name="search"
          autoFocus
          value={query}
          onChange={handleChange}
        />
      </form>
      {loader && <Loader/>}
      {error && <ErrorMessage error={error}/>}
      {results.length > 0 && (
        <MovieList results={results} />
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default MoviesPage;