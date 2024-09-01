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
  const initialQuery = params.get('query') || '';
  let initialPage = Number(params.get('page')) || 1;
  const [query, setQuery] = useState(initialQuery);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [movies, setMovies] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isEmpty, setIsEmpty] = useState(!initialQuery);
  const [isVisible, setIsVisible] = useState(false);
  const [page, setPage] = useState(initialPage);
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

        setMovies((prevMovies) => [...prevMovies, ...results]);
        setIsVisible(page < total_pages);
      } catch (error) {
        setError(error);
        toast.error('Error fetching movies');
      } finally {
        setLoader(false);
      }
    };

    fetchMovies();
  }, [page, query]);

  const onHandleSubmit = (value) => {
    setQuery(value);
    setPage(1);
    setIsVisible(false);
    setIsEmpty(false);
    setError(null);
    setMovies([]);

    params.set('query', value);
    params.set('page', 1);
    setParams(params);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
    params.set('page', Number(page) + 1);
    setParams(params);
  };

  return (
    <div>
      <h2 className={style.header}>Let`s search movies!</h2>
      <Form onSubmit={onHandleSubmit} />
      {loader && <Loader />}
      {error && <ErrorMessage error={error} />}
      {movies.length > 0 && <MovieList results={movies} />}
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
