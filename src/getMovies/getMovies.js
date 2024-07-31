import axios from "axios"

axios.defaults.baseURL = 'https://api.themoviedb.org'
const options = {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmZlYWQ0NmI1NjljM2FiN2VlMGI0OWRiMzEyMmQxYiIsIm5iZiI6MTcyMTk5MzY2NS4yMzYxNzgsInN1YiI6IjY2YTM4ODYxYjI0MWExMDhhNGNhOWQwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lywIEjOQjR0Un-zY6Zo3KfW2_Xq0XY34FuejEva4koM'
  }
};

export const getTrendingMovies = async () => {
    const {data} = await axios.get(`/3/trending/movie/day?language=en-US`, options)
    return data
}

export const getMovieDetails = async (id)=>{
  const { data } = await axios.get(
    `/3/movie/${id}?language=en-US`, options
  )
  return data
}


export const getCast = async (id) => {
  const {data} = await axios.get(
    `/3/movie/${id}/credits?language=en-US`
    , options)
    return data
}

export const getReviews = async (id) =>{
  const {data} = await axios.get( 
     `/3/movie/${id}/reviews?language=en-US`
    , options)
    return data
}

export const searchMovie = async(query) =>{
  const {data} = await axios.get(
      `/3/search/movie?query=${query}&include_adult=false&language=en-US`
    , options
  )
  return data
}