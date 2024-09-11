import { useDispatch } from 'react-redux';
import styles from './SignOutButton.module.css';
import { signOutUser } from '../../redux/firebaseAuth/operations';
import logOut from '../../images/logOut.svg';

const SignOutButton = () => {
  const dispatch = useDispatch();

  return (
    <>
      <button className={styles.signout_button} onClick={() => dispatch(signOutUser())}>
        <img src={logOut} alt="logout-icon" />
        Sign out
      </button>
    </>
  );
};

export default SignOutButton;
