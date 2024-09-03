import { Link } from 'react-router-dom';
import style from './AuthNav.module.css';
const AuthNav = () => {
  return (
    <div className={style.auth_nav_item}>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default AuthNav;
