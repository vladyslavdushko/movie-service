import { useDispatch, useSelector } from 'react-redux';
import styles from './UserMenu.module.css';
import { selectEmail, selectName } from '../../redux/firebaseAuth/selectors';
import { signOutUser } from '../../redux/firebaseAuth/operations';
import logOut from '../../images/logOut.svg';
const UserMenu = () => {
  const email = useSelector(selectEmail);
  const name = useSelector(selectName);
  const dispatch = useDispatch();

  return (
    <div className={styles.user_nav_item}>
      <p>Welcome, {name ? name : email} 😎</p>
      <button className={styles.signout_button} onClick={() => dispatch(signOutUser())}>
        <img src={logOut} alt="logout-icon" />
        Sign out
      </button>
    </div>
  );
};

export default UserMenu;
