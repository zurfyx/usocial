import React from 'react';
import { connect } from '../utils/react-context';
import { UserContext } from '../app/UserProvider';

function flow() {
  window.location.href = 'https://www.facebook.com/v3.2/dialog/oauth?'
    + 'client_id=369638680499641'
    + '&redirect_uri=http://localhost:3000/dashboard/connect'
    + '&state=foo';
}

async function callback(pushData) {
  const params = window.location.search;
  const moreParams = `&did=${pushData.did}&pushToken=${pushData.pushToken}&publicEncKey=${pushData.publicEncKey}`;
  await fetch('http://localhost:3001/connect/facebook' + params + moreParams)
  console.info('done')
}

async function huh() {
  await fetch('http://localhost:3001/')
}

function ConnectFacebook({ context }) {
  const pushData = {
    did: context.user.did,
    pushToken: context.user.pushToken,
    publicEncKey: context.user.publicEncKey,
  };

  return (
    <div>
      <button onClick={flow}>flow</button>
      <button onClick={() => callback(pushData)}>callback</button>
      <button onClick={huh}>huh</button>
      <span>facebook</span>
    </div>
  );
}

export default connect(UserContext.Consumer, ConnectFacebook);
