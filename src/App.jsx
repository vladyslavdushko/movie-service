import './App.css'
import { Route, Routes, NavLink } from 'react-router-dom'
import HomePage from './pages/Movies/HomePage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage'
import MoviesPage from './pages/MoviesPage/MoviesPage'
import MovieCast from './components/MovieCast/MovieCast'
import MovieReviews from './components/MovieReviews/MovieReviews'
function App() {

  return (
    <>
    <nav className='nav_container'>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/movies'>Movies</NavLink>
    </nav>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/movies' element={<MoviesPage/>}/>
      <Route path='/movies/:movieId' element={<MovieDetailsPage/>} > 
      <Route path='cast' element={<MovieCast/>}> </Route>
      <Route path='reviews' element={<MovieReviews/>}> </Route>
      </Route>
      <Route path='*' element={<NotFoundPage/>} />

    </Routes>
    </>
  )
}

export default App
