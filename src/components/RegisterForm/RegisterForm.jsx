import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import styles from './RegisterForm.module.css';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUser } from '../../redux/firebaseAuth/operations';

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
    // createUser(userData.email, userData.password);
    actions.resetForm();
  };

  return (
    <div className={styles.form_container}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className={styles.form}>
          <label className={styles.field_container}>
            Name
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="p" style={{ color: 'red' }} />
          </label>

          <label className={styles.field_container}>
            Email
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="p" style={{ color: 'red' }} />
          </label>

          <label className={styles.field_container}>
            Password
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="p" style={{ color: 'red' }} />
          </label>

          <button type="submit">Register</button>
        </Form>
      </Formik>

      <div className={styles.link_container}>
        <p>
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
