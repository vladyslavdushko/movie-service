import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import styles from './Navigations.module.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import UserMenu from '../UserMenu/UserMenu';
import AuthNav from '../AuthNav/AuthNav';

const NavBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div>
      <nav className={styles.nav_container}>
        <div className={styles.inner_container}>
          <NavLink
            to="/"
            className={({ isActive }) => {
              return clsx('link', isActive && 'isActive');
            }}>
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) => {
              return clsx('link', isActive && 'isActive');
            }}>
            Movies
          </NavLink>
        </div>
        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </nav>
    </div>
  );
};

export default NavBar;
