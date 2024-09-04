import { useDispatch, useSelector } from 'react-redux';
import styles from './UserMenu.module.css';
import { selectEmail } from '../../redux/firebaseAuth/selectors';
import { signOutUser } from '../../redux/firebaseAuth/operations';
const UserMenu = () => {
  const email = useSelector(selectEmail);
  // const token = useSelector(selectToken);
  const dispatch = useDispatch();
  return (
    <div className={styles.user_nav_item}>
      <p>Welcome, {email} 😎</p>
      <button onClick={() => dispatch(signOutUser())}>Signout</button>
    </div>
  );
};

export default UserMenu;
