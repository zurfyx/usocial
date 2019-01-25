import React, { createContext } from 'react';
import { useLocalStorage } from '../utils/react-context';
import { requestDisclosure, clearStorage as uportClearStorage } from '../uport'

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

async function signout(context) {
  uportClearStorage();
  window.sessionStorage.clear();
  context.setUser({});
}

export {
  UserContext,
  refresh,
  signout,
};
export default UserProvider;
