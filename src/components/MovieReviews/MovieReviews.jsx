import { useEffect, useState } from "react"
import { getReviews } from "../../getMovies/getMovies"
import { useParams,  } from "react-router-dom"
import Loader from "../Loader/Loader"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
const MovieReviews = () => {
  const {movieId} = useParams()
  const [reviews, setReviews] = useState({results: []})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(()=>{

    const getReviewsById = async(id) =>{

      try {
        setLoading(true)
        const data = await getReviews(id)
        setReviews(data)
      } catch (error) {
        setError(error)
      } finally{
        setLoading(false)
      }
    }

    if (movieId) getReviewsById(movieId)
  },[movieId])

  console.log(reviews.results.length);
  return (
    <>
    {loading && <Loader/>}
    {error && <ErrorMessage error={error}/>}
    {!loading && !error && reviews.results.length === 0 && <p>We don`t have reviews for this movie</p>}
    {reviews.results.length > 0 && <ul>
      {reviews.results.map(review =>
        <div key={review.id}>
          <b>Author: {review.author}</b>
          <p>Content: {review.content}</p>
        </div>
      )}
    </ul>}
    </>
  )
}

export default MovieReviews