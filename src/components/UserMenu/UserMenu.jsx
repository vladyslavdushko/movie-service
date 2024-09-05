import { useDispatch, useSelector } from 'react-redux';
import styles from './UserMenu.module.css';
import { selectEmail, selectName } from '../../redux/firebaseAuth/selectors';
import { signOutUser } from '../../redux/firebaseAuth/operations';
const UserMenu = () => {
  const email = useSelector(selectEmail);
  const name = useSelector(selectName);
  // const token = useSelector(selectToken);
  const dispatch = useDispatch();
  return (
    <div className={styles.user_nav_item}>
      <p>Welcome, {name ? name : email} 😎</p>
      <button onClick={() => dispatch(signOutUser())}>Signout</button>
    </div>
  );
};

export default UserMenu;
