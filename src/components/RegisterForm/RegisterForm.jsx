import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import styles from './RegisterForm.module.css';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUser } from '../../redux/firebaseAuth/operations';
import GoogleButton from '../GoogleButton/GoogleButton';

const RegisterForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Ім’я має містити не менше 2 символів')
      .max(50, 'Ім’я має містити не більше 50 символів')
      .required('Це поле обов’язкове'),
    email: Yup.string().email('Невірний формат електронної пошти').required('Це поле обов’язкове'),
    password: Yup.string()
      .min(6, 'Пароль має містити не менше 6 символів')
      .required('Це поле обов’язкове')
  });

  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    email: '',
    password: ''
  };

  const onSubmit = (values, actions) => {
    const userData = {
      email: values.email,
      password: values.password
    };
    dispatch(createUser(userData));
    actions.resetForm();
  };

  return (
    <div className={styles.form_container}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className={styles.form}>
          <label className={styles.field_container}>
            Name
            <Field type="text" name="name" className={styles.input_field} />
            <ErrorMessage name="name" component="p" className={styles.error_message} />
          </label>

          <label className={styles.field_container}>
            Email
            <Field type="email" name="email" className={styles.input_field} />
            <ErrorMessage name="email" component="p" className={styles.error_message} />
          </label>

          <label className={styles.field_container}>
            Password
            <Field type="password" name="password" className={styles.input_field} />
            <ErrorMessage name="password" component="p" className={styles.error_message} />
          </label>

          <button type="submit" className={styles.submit_button}>
            Register
          </button>
          <GoogleButton>Sign in with Google</GoogleButton>
        </Form>
      </Formik>

      <div className={styles.link_container}>
        <p className={styles.text}>
          Already have an account?{' '}
          <Link to="/login" className={styles.register_link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
export default RegisterForm;
