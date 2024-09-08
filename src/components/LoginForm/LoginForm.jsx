import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import styles from './LoginForm.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser, redirectResult } from '../../redux/firebaseAuth/operations';
import GoogleButton from '../GoogleButton/GoogleButton';
import { useEffect } from 'react';

const LoginForm = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(redirectResult());
  }, [dispatch]);

  const validationSchema = Yup.object({
    email: Yup.string().email('Невірний формат електронної пошти').required('Це поле обов’язкове'),
    password: Yup.string()
      .min(6, 'Пароль має містити не менше 6 символів')
      .required('Це поле обов’язкове')
  });

  const initialValues = {
    email: '',
    password: ''
  };

  const onSubmit = (values, actions) => {
    const userData = {
      email: values.email,
      password: values.password
    };
    console.log(userData.email, 'email');
    console.log(userData.password, 'password');

    dispatch(loginUser(userData));
    actions.resetForm();
  };

  return (
    <div className={styles.form_container}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className={styles.form}>
          <label htmlFor="email" className={styles.field_container}>
            Email
            <Field type="email" id="email" name="email" className={styles.input_field} />
            <ErrorMessage name="email" component="p" className={styles.error_message} />
          </label>
          <label htmlFor="password" className={styles.field_container}>
            Password
            <Field type="password" id="password" name="password" className={styles.input_field} />
            <ErrorMessage name="password" component="p" className={styles.error_message} />
          </label>
          <button type="submit" className={styles.submit_button}>
            Log in
          </button>
          <GoogleButton>Log in</GoogleButton>
        </Form>
      </Formik>

      <div className={styles.link_container}>
        <p className={styles.text}>
          Don’t have an account?{' '}
          <Link to="/register" className={styles.register_link}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
