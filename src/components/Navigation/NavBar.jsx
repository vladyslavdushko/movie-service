import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import styles from './Navigations.module.css';
import { useSelector } from 'react-redux';
import UserMenu from '../UserMenu/UserMenu';
import AuthNav from '../AuthNav/AuthNav';
import { selectIsLoggedInFire } from '../../redux/firebaseAuth/selectors';

const NavBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedInFire);
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
          <NavLink
            to="watch-later"
            className={({ isActive }) => {
              return clsx('link', isActive && 'isActive');
            }}>
            Watchlist
          </NavLink>
        </div>
        <div className={styles.login_container}>{isLoggedIn ? <UserMenu /> : <AuthNav />}</div>
      </nav>
    </div>
  );
};

export default NavBar;
