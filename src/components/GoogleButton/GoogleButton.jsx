import styles from './GoogleButton.module.css';
import googleLogo from '../../images/googleLogo.svg';
import { useDispatch } from 'react-redux';
import { signInWithGoogle } from '../../redux/firebaseAuth/operations';

const GoogleButton = ({ children }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        className={styles.google_button}
        type="button"
        onClick={() => dispatch(signInWithGoogle())}>
        <img src={googleLogo} alt="Google logo" className={styles.google_logo} />
        {children}
      </button>
    </div>
  );
};

export default GoogleButton;
