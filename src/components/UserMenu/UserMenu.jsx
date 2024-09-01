import { useDispatch, useSelector } from 'react-redux';
import { selectToken, selectUser } from '../../redux/auth/selectors';
import { logOutUser } from '../../redux/auth/operations';

const UserMenu = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  console.log(token);
  return (
    <div className="nav-item">
      <p>Welcome, {user.name} 😎</p>
      <button onClick={() => dispatch(logOutUser(token))}>Signout</button>
    </div>
  );
};

export default UserMenu;
