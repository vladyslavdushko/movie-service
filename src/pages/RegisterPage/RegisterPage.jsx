import { useSelector } from 'react-redux';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { Navigate } from 'react-router-dom';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <h2 className={styles.header}>Registration</h2>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
