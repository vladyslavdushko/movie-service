import './Appp.css'
import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import Loader from './components/Loader/Loader'

const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'))
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'))
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'))
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'))

function App() {
  return (
    <>
  <Navigation/>
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/movies' element={<MoviesPage />} />
          <Route path='/movies/:movieId' element={<MovieDetailsPage />}>
            <Route path='cast' element={<MovieCast />} />
            <Route path='reviews' element={<MovieReviews />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
