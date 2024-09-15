import { Link, useLocation } from 'react-router-dom';
import style from './MovieList.module.css';
import { FaPlusCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Select from 'react-select';
import { selectIsLoggedInFire, selectToken } from '../../redux/firebaseAuth/selectors';
import { addToCollection, getCollections } from '../../firebase/firebase';
import toast from 'react-hot-toast';

const MovieList = ({ results }) => {
  const location = useLocation();
  const uid = useSelector(selectToken);
  const isLoggedIn = useSelector(selectIsLoggedInFire);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [collections, setCollections] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(null);

  const fetchCollections = async () => {
    if (!uid) {
      toast.error('User not logged in.');
      return;
    }

    try {
      const userCollections = await getCollections(uid);
      const formattedCollections = userCollections.map((collection) => ({
        value: collection.id,
        label: collection.name
      }));
      setCollections([{ value: 'watchLater', label: 'Watch Later' }, ...formattedCollections]);
    } catch (error) {
      toast.error('Error fetching collections');
    }
  };

  const handleAddMovie = async (uid, collectionId, movieData) => {
    try {
      await addToCollection(uid, collectionId, movieData);
      return toast.success('Movie added to collection successfully');
    } catch (error) {
      toast.error('Failed to add movie');
    }
  };

  const handleCollectionSelect = async (movie, collection) => {
    setIsDropdownVisible(null);

    if (collection.value === 'watchLater') {
      await handleAddMovie(uid, 'watchLater', movie);
    } else {
      await handleAddMovie(uid, collection.value, movie);
    }
  };

  const handleAddButtonClick = async (movie) => {
    if (!isLoggedIn) {
      return toast.error('Please log in to add movies to collections');
    }
    setSelectedMovie(movie);
    setIsDropdownVisible(movie.id);
    await fetchCollections();
  };

  return (
    <ul className={style.results}>
      {results.map((movie) => (
        <li key={movie.id} className={style.movie_list_item}>
          <div>
            <FaPlusCircle
              onClick={() => handleAddButtonClick(movie)}
              className={style.add_button}
            />
            {isDropdownVisible === movie.id && (
              <Select
                options={collections}
                onChange={(selectedOption) => handleCollectionSelect(movie, selectedOption)} // Passed movie directly
                placeholder="Choose collection"
              />
            )}
          </div>
          <Link to={`/movies/${movie.id}`} state={location}>
            <div className={style.item_container}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={style.movi_poster}
              />
              <div className={style.name_container}>
                <p className={style.movie_title}>{movie.title}</p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
