import { useSelector } from 'react-redux';
import styles from './UserMenu.module.css';
import { selectEmail, selectName } from '../../redux/firebaseAuth/selectors';
import SignOutButton from '../SignOutButton/SignOutButton';

const UserMenu = () => {
  const email = useSelector(selectEmail);
  const name = useSelector(selectName);

  return (
    <div className={styles.user_nav_item}>
      <p>Welcome, {name ? name : email} 😎</p>
      <div className={styles.sign_out_button}>
        <SignOutButton />
      </div>
    </div>
  );
};

export default UserMenu;
