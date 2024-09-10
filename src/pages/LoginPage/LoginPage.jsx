import { useSelector } from 'react-redux';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.css';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedInFire } from '../../redux/firebaseAuth/selectors';
import { useEffect } from 'react';
import { redirectResult } from '../../firebase/firebase';

const LoginPage = () => {
  const isLoggedIn = useSelector(selectIsLoggedInFire);

  useEffect(() => {
    const data = async () => {
      const result = await redirectResult();
      console.log(result, 'redirect result');
    };
    data();
  }, []);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="container">
      <div className={styles.login_container}>
        <h2 className={styles.header}>LoginPage</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
