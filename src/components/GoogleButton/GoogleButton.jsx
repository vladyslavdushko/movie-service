import styles from './GoogleButton.module.css';
import googleLogo from '../../images/googleLogo.svg';
import { useDispatch } from 'react-redux';
import { signInWithGooglePopUp } from '../../redux/firebaseAuth/operations';

const GoogleButton = ({ children }) => {
  const dispatch = useDispatch();
  return (
    <>
      <button
        className={styles.google_button}
        type="button"
        onClick={() => dispatch(signInWithGooglePopUp())}>
        <img src={googleLogo} alt="Google logo" className={styles.google_logo} />
        {children}
      </button>
    </>
  );
};

export default GoogleButton;
