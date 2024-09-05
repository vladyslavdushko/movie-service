import { useDispatch } from 'react-redux';
import { signInWithGoogle } from '../../redux/firebaseAuth/operations';
import styles from './GoogleButton.module.css';
import googleLogo from '../../images/googleLogo.svg';
const GoogleButton = ({ children }) => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(signInWithGoogle())}
      className={styles.google_button}
      type="button">
      <img src={googleLogo} alt="Google logo" className={styles.google_logo} />
      {children}
    </button>
  );
};

export default GoogleButton;
