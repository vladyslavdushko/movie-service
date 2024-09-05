import { Link } from 'react-router-dom';
import style from './BackButton.module.css';
const BackButton = ({ props }) => {
  return (
    <div className={style.container}>
      <button className={style.back_button}>
        <Link to={props}>Go back</Link>
      </button>
    </div>
  );
};

export default BackButton;
