import { useSelector } from 'react-redux';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.css';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedInFire } from '../../redux/firebaseAuth/selectors';

const LoginPage = () => {
  const isLoggedIn = useSelector(selectIsLoggedInFire);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h2 className={styles.header}>LoginPage</h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
