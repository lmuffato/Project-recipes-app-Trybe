import { createContext } from 'react';

const LoginContext = createContext({
  state: {},
  dispatch: () => {},
});

export default LoginContext;
