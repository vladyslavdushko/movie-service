import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsLoggedInFire } from '../redux/firebaseAuth/selectors';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedInFire);
  const location = useLocation();

  if (isLoggedIn) {
    return children;
  }

  return <Navigate to="/login" state={location} />;
};

export default PrivateRoute;
