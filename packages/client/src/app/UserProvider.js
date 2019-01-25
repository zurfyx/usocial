import React, { createContext } from 'react';
import { useLocalStorage } from '../utils/react-context';
import { requestDisclosure } from '../uport'

const UserContext = createContext();

function UserProvider(props) {
  const [user, setUser] = useLocalStorage('user', {});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

/**
 * Actions
 */
async function refresh(context) {
  const data = await requestDisclosure();
  context.setUser(data);
}

export {
  UserContext,
  refresh,
};
export default UserProvider;
