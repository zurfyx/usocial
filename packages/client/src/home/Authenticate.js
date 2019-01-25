import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from '../utils/react-context';
import { UserContext } from '../app/UserProvider';
import { refresh } from '../app/UserProvider';
import Loading from '../common/Loading';

const GetStarted = styled.button`
  color: #4663ac;
  background-color: #fff;
  border: 0;
  border-radius: 5px;
  padding: 1.5rem 4rem;
`;

function Authenticate({ user }) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function onRefresh() {
    setIsRefreshing(true);
    await refresh.call(Authenticate, user);
    setIsRefreshing(false);
  }

  return (
    <Fragment>
      {!isRefreshing && (
        <GetStarted onClick={() => onRefresh(user)}>
          Get started
        </GetStarted>)}
      {isRefreshing && <Loading text="Generating QR code" />}
    </Fragment>
  );
}

export default connect('user', UserContext.Consumer, Authenticate);
