import React from 'react';
import styled from 'styled-components';
import { connect } from '../utils/react-context';
import { UserContext } from '../app/UserProvider';
import { requestDisclosure } from '../uport';

const GetStarted = styled.button`
  color: #4663ac;
  background-color: #fff;
  border: 0;
  border-radius: 5px;
  padding: 1.5rem 4rem;
`;

function Authenticate({ user }) {
  
  async function authenticate() {
    const data = await requestDisclosure();
    user.setUser(data);
  }

  return (
    <GetStarted onClick={() => authenticate()}>
      Get started
    </GetStarted>
  );
}

export default connect('user', UserContext.Consumer, Authenticate);
