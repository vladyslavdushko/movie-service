import { useEffect, useState } from "react";
import { getCast } from "../../getMovies/getMovies";
import { useParams } from "react-router-dom";
import styles from './MovieCast.module.css'
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Swiper, SwiperSlide} from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState({ cast: [] });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCastById = async (id) => {
      try {
        setLoading(true);
        const data = await getCast(id);
        setCast(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      getCastById(movieId);
    }
  }, [movieId]);

  return (
    <>
    {loading && <Loader/>}
    {error && <ErrorMessage error={error}/>}
    {!loading && !error && cast.cast.length === 0 && <p>We don`t have cast for this movie</p>}
      <Swiper 
                spaceBetween={50}
                slidesPerView={3}
      className={styles.cast_ul}
      modules={Pagination}
      pagination={{ clickable: true }}
      >
        
        {cast.cast.map((actor) => (
          <SwiperSlide 
          className={styles.swiper_slide}
          key={actor.id}>
            <div className={styles.slideContainer}>
              <img
              className={styles.actor_image}
                src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : 'https://via.placeholder.com/150'}
                alt={actor.name}
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MovieCast;
