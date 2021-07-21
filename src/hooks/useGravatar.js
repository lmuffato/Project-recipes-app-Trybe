import md5 from 'crypto-js/md5';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

const useGravatar = () => {
  const { login } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem('user')) || login;
  const { email } = user;
  const hash = md5(email).toString();
  console.log(user);
  console.log(hash);

  return `https://www.gravatar.com/avatar/${hash}`;
};

export default useGravatar;
