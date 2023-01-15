import { useSelector } from 'react-redux';
import { selectUser } from 'redux/authSlice';

import LoggedUser from 'components/UserMenu/LoggedUser';
import AnonymousUser from 'components/UserMenu/AnonymousUser';

const UserMenu = () => {
  const user = useSelector(selectUser);

  return user ? <LoggedUser user={user} /> : <AnonymousUser />;
};

export default UserMenu;
