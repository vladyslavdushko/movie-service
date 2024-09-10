import './Appp.css';
import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import Layout from './components/Layout/Layout';
import RestrictedRoute from './routes/RestrictedRoute';
import PrivateRoute from './routes/PrivateRoute';
import { useDispatch } from 'react-redux';
import { getMe } from './redux/firebaseAuth/operations';
import WatchLaterPage from './pages/WatchLaterPage/WatchLaterPage';
import { auth } from './firebase/firebase';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getMe());
  // }, [dispatch]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/movies"
              element={
                <PrivateRoute>
                  <MoviesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <PrivateRoute>
                  <MovieDetailsPage />
                </PrivateRoute>
              }>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route
              path="watch-later"
              element={
                <PrivateRoute>
                  <WatchLaterPage />
                </PrivateRoute>
              }
            />
          </Route>
          <Route
            path="register"
            element={
              <RestrictedRoute>
                <RegisterPage />
              </RestrictedRoute>
            }
          />

          <Route
            path="login"
            element={
              <RestrictedRoute>
                <LoginPage />
              </RestrictedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
