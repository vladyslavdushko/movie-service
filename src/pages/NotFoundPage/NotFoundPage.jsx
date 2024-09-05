import { Link } from 'react-router-dom';
import style from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={style.container}>
      <button className={style.back_button}>
        <Link to="/">Go back</Link>
      </button>
      <p className={style.error_message}>Oops!... We didn’t find this page</p>
    </div>
  );
};

export default NotFoundPage;
