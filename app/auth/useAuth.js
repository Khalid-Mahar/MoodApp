import {useContext} from 'react';
import AuthContext from './AuthContext';
export default useAuth = () => {
  const {user, setUser} = useContext(AuthContext);

  const Login = user => {
    setUser(user);
  };

  const Logout = async () => {
        setUser(null);
  };

  return {user, setUser, Login, Logout};
};
