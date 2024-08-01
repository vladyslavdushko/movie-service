import clsx from 'clsx'
import './Appp.css'
import { lazy, Suspense } from 'react'
import { Route, Routes, NavLink } from 'react-router-dom'

const HomePage = lazy(() => import('./pages/Movies/HomePage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'))
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'))
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'))
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'))

function App() {
  return (
    <>
      <nav className='nav_container'>
        <NavLink to='/' className={({isActive}) => {
          return clsx('link', isActive && 'isActive')
        }}>Home</NavLink>
        <NavLink to='/movies'  className={({isActive}) => {
          return clsx('link', isActive && 'isActive')
        }}>Movies</NavLink>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
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
