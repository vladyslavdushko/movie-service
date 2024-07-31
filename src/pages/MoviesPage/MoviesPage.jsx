import style from './MoviesPage.module.css'
import { FiSearch } from 'react-icons/fi';
import toast, {Toaster} from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { searchMovie } from '../../getMovies/getMovies';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [results, setResults] = useState([]);
  const [params, setParams] = useSearchParams()
  const searchQuery = params.get('query');

  const location = useLocation()
  useEffect(() => {
    if (searchQuery) {
      setQuery(searchQuery); 
      searchMovieByKeyWord(searchQuery);
    }

    setQuery('')
  }, [searchQuery]);

  const searchMovieByKeyWord = async (query) => {
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
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      return toast.error("Please enter a search query.");
    }
    searchMovieByKeyWord(query);
     params.set('query', query)
    setParams(params)
    setQuery('');
  };
  console.log(location, 'MoviePage');

  return (
    <div>
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
      {loader && <p>Loading...</p>}
      {error && <p className={style.error}>{error}</p>}
      {results.length > 0 && (
        <ul className={style.results}>
          {results.map((movie) => (
           <li key={movie.id} className={style.movie_list_item}>
            <Link to={`/movies/${movie.id}` } state={location}>
              <div className={style.item_container}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className={style.movi_poster} />
                <p className={style.movie_title}>{movie.title}</p>
                </div>
            </Link>
           </li>
          ))}
        </ul>
      )}
            <Toaster position="top-right" reverseOrder={false} />
    </div>
    
  );
};

export default MoviesPage;
