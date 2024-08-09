import style from './MoviesPage.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { searchMovie } from '../../getMovies/getMovies';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { Form } from '../../components/Form/Form';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';

const MoviesPage = () => {
  const [params, setParams] = useSearchParams();
  const initialQuery = params.get('query') || ''; // Отримуємо початковий запит з URL
  const [query, setQuery] = useState(initialQuery); 
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isEmpty, setIsEmpty] = useState(!initialQuery); 
  const [isVisible, setIsVisible] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setLoader(true);
      try {
        const { results, total_pages } = await searchMovie(query, page);

        if (!results.length) {
          setIsEmpty(true);
          setIsVisible(false);
          return;
        }
        setMovies(prevMovies => [...prevMovies, ...results]);
        setIsVisible(page < total_pages);
    console.log(results.length, 'use effect');

      } catch (error) {
        setError(error);
        toast.error("Error fetching movies");
      } finally {
        setLoader(false);
      }
    };

    fetchMovies();
  }, [page, query]);
console.log(query);
  const onHandleSubmit = value => {
    setQuery(value);
    setMovies([]);
    setPage(1);
    setIsVisible(false);
    setIsEmpty(false);
    setError(null);

    params.set('query', value);
    params.set('page', page)
    setParams(params);
  console.log(movies.length, 'onHandleSubmit');

  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
    params.set('page', page + 1);
    setParams(params);
  };
  const slicedMovies = movies.slice(0,19)
  return (
    <div>
      <h2 className={style.header}>Let`s search movies!</h2>
      <Form onSubmit={onHandleSubmit} />
      {loader && <Loader />}
      {error && <ErrorMessage error={error} />}
      {slicedMovies.length > 0 && <MovieList results={movies} />}
      {isVisible && (
        <LoadMoreBtn onClick={loadMore} disabled={loader}>
          {loader ? 'Loading...' : 'Load more'}
        </LoadMoreBtn>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default MoviesPage;
