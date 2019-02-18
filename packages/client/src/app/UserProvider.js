import React, { createContext } from 'react';
import { addAttestation as usocialToolsAddAttestion } from 'usocial';
import { useLocalStorage } from '../utils/react-context';
import { requestDisclosure, signout as uportSignout } from '../uport'

const UserContext = createContext();

function UserProvider(props) {
  const [user, setUser] = useLocalStorage('user', {});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

function securityParams(context) {
  if (!context.user) {
    return {
      iss: null,
      sub: null,
    };
  }
  console.info({
    iss: process.env.REACT_APP_UPORT_DID,
    sub: context.user.did,
  })

  return {
    iss: process.env.REACT_APP_UPORT_DID,
    sub: context.user.did,
  };
}

/**
 * Actions
 */
async function sync(context) {
  const data = await requestDisclosure();
  context.setUser(data);
}

async function signout(context) {
  uportSignout();
  context.setUser({});
  window.sessionStorage.clear();
}

function addAttestation(context, attestation) {
  context.setUser({
    ...context.user,
    verified: usocialToolsAddAttestion(context.user.verified, attestation),
  });
}

export {
  UserContext,
  securityParams,
  sync,
  signout,
  addAttestation,
};
export default UserProvider;
