import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from '../utils/react-context';
import { UserContext } from '../app/UserProvider';
import { sync } from '../app/UserProvider';
import Loading from '../common/Loading';

const GetStarted = styled.button`
  color: #4663ac;
  background-color: #fff;
  border: 0;
  border-radius: 5px;
  padding: 1.5rem 4rem;
`;

function Authenticate({ user }) {
  const [isSyncing, setIsSyncing] = useState(false);

  async function onRefresh() {
    setIsSyncing(true);
    await sync.call(Authenticate, user);
  }

  return (
    <Fragment>
      {!isSyncing && (
        <GetStarted onClick={() => onRefresh(user)}>
          Get started
        </GetStarted>)}
      {isSyncing && <Loading text="Generating QR code" />}
    </Fragment>
  );
}

export default connect('user', UserContext.Consumer, Authenticate);
