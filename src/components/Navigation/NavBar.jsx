import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import styles from './Navigations.module.css';
import { useSelector } from 'react-redux';
import UserMenu from '../UserMenu/UserMenu';
import AuthNav from '../AuthNav/AuthNav';
import { selectIsLoggedInFire } from '../../redux/firebaseAuth/selectors';
import { RiMenu2Fill } from 'react-icons/ri';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

const NavBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedInFire);
  const [isOpen, setIsOpen] = useState(false);

  const handleBurgerMenu = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <div>
      <nav className={styles.nav_container}>
        <div className={styles.burger_menu_container}>
          <RiMenu2Fill className={styles.burger_menu_item} onClick={handleBurgerMenu} />
        </div>
        <ul className={styles.inner_container}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => {
                return clsx(styles.link, isActive && 'isActive');
              }}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className={({ isActive }) => {
                return clsx(styles.link, isActive && 'isActive');
              }}>
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="watch-later"
              className={({ isActive }) => {
                return clsx(styles.link, isActive && 'isActive');
              }}>
              Watchlist
            </NavLink>
          </li>
        </ul>

        <ul className={clsx(styles.nav_mobile_container, isOpen ? styles.open : styles.closed)}>
          <IoClose className={styles.close_button} onClick={handleBurgerMenu} />

          <ul className={styles.inner_mobile_menu_container}>
            <li className={styles.nav_mobile_menu_item}>
              <NavLink
                to="/"
                className={({ isActive }) => {
                  return clsx(styles.mobile_link, isActive && 'isActive');
                }}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/movies"
                className={({ isActive }) => {
                  return clsx(styles.mobile_link, isActive && 'isActive');
                }}>
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink
                to="watch-later"
                className={({ isActive }) => {
                  return clsx(styles.mobile_link, isActive && 'isActive');
                }}>
                Watchlist
              </NavLink>
            </li>
          </ul>
        </ul>
        <div className={styles.login_container}>{isLoggedIn ? <UserMenu /> : <AuthNav />}</div>
      </nav>
    </div>
  );
};

export default NavBar;
