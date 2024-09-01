import { Link } from 'react-router-dom';

const AuthNav = () => {
  return (
    <div className="nav-item">
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default AuthNav;
