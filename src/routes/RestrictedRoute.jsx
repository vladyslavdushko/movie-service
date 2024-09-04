import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsLoggedInFire } from '../redux/firebaseAuth/selectors';

const RestrictedRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedInFire);
  const location = useLocation();
  if (isLoggedIn) {
    return <Navigate to={location?.state ?? '/'} />;
  }
  return children;
};

export default RestrictedRoute;
