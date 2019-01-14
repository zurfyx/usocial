import React, { createContext } from 'react';
import { useLocalStorage } from '../utils/react-context';

const UserContext = createContext();

function UserProvider(props) {
  const [user, setUser] = useLocalStorage('user', {});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export {
  UserContext,
};
export default UserProvider;
