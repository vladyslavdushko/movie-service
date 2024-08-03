import { useEffect, useState } from "react"
import {getTrendingMovies} from '../../getMovies/getMovies'
// import styles from './Movies.module.css'
import MovieList from "../../components/MovieList/MovieList"
const HomePage = () => {
const [movies, setMovies] = useState([])
const [loading, setLoading] = useState(false)

useEffect(() => {
    
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const data = await getTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally{
        setLoading(false)
      }
    };
    fetchMovies();
  }, []); 
  return (
    <div>
        <h1>Trending today</h1>
        {loading && <p>Loading...</p>}
        <MovieList  results={movies} />
    </div> 
  )
}

export default HomePage