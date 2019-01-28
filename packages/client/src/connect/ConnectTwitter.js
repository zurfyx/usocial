import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from '../utils/react-context';
import { clearQueryParams } from '../utils/oauth2';
import { UserContext, addAttestation } from '../app/UserProvider';
import { currentAttestation } from '../uport/tools';
import Loading from '../common/Loading';
import Section from '../common/Section';
import DefaultButton from '../common/DefaultButton';
import SectionHeader2 from '../common/SectionHeader2';
import { connectTwitterOauthToken, connectTwitter } from '../api/connect';

async function requestToken() {
  const { oauthToken, encryptedSecretStore } = await connectTwitterOauthToken();
  
  // Twitter returns the same oauth token back. It can act as CSRF, just like state in OAuth2
  window.sessionStorage.setItem('oauthToken', oauthToken);
  // Store encryptedSecretStore for later; we have to return it back to the API
  window.sessionStorage.setItem('encryptedSecretStore', encryptedSecretStore);

  const twitterUrl = new URL('https://api.twitter.com/oauth/authorize');
  twitterUrl.searchParams.set('oauth_token', oauthToken);
  
  window.location.href = twitterUrl.toString();
}

async function handleCallback(twitterOauthToken, twitterOauthVerifier, uportPush, attestedJwt) {
  const storedOauthToken = window.sessionStorage.getItem('oauthToken');
  if (!storedOauthToken || storedOauthToken !== twitterOauthToken) {
    throw new Error('Requested token doesn\'t match Twitter\'s');
  }

  const encryptedSecretStore = window.sessionStorage.getItem('encryptedSecretStore');
  return connectTwitter(twitterOauthToken, twitterOauthVerifier, encryptedSecretStore, uportPush, attestedJwt);
}

function ConnectTwitter({ location, user }) {
  const urlParams = new URLSearchParams(location.search);
  const urlOauthToken = urlParams.get('oauth_token');
  const urlOauthVerifier = urlParams.get('oauth_verifier');

  if (urlOauthToken && urlOauthVerifier) {
    clearQueryParams();
    return <CallbackView user={user} twitterOauthToken={urlOauthToken} twitterOauthVerifier={urlOauthVerifier} />;
  }

  return <DefaultView />;
}

const Instructions = styled.p`
  margin-bottom: 2rem;
`;

function DefaultView() {
  const [isConnecting, setIsConnecting] = useState(false);

  return (
    <Section>
      <SectionHeader2>You're about to connect your Twitter account</SectionHeader2>
      <Instructions>
        You will be sent to Twitter to grant uSocial permission to read over your basic data.
        The attestation you will be sent will contain your Twitter ID.
      </Instructions>
      <Instructions>
        Your personal information is never stored on our attestation servers.
      </Instructions>
      {!isConnecting && 
        <DefaultButton
          type="submit"
          onClick={() => { setIsConnecting(true); requestToken(); }}>
          Connect
        </DefaultButton>}
      {isConnecting && <Loading text="Contacting Twitter" />}
    </Section>
  );
}

function CallbackView({ user, twitterOauthToken, twitterOauthVerifier }) {
  const [success, setSuccess] = useState(false);

  const pushData = {
    did: user.user.did,
    pushToken: user.user.pushToken,
    publicEncKey: user.user.publicEncKey,
  };

  useEffect(() => {
    (async () => {
      const attestedJwt = currentAttestation(user.user.verified) && currentAttestation(user.user.verified).jwt;
      const attestation = await handleCallback(twitterOauthToken, twitterOauthVerifier, pushData, attestedJwt);
      await addAttestation(user, attestation);
      setSuccess(true);
    })();
  }, []);

  return (
    <Section>
      <SectionHeader2>We're attesting your Twitter identity</SectionHeader2>
      {!success && <Loading text="Hold tight! Your Twitter identity is being verified" />}
      {success && 'Success! Your uPort attestation should show up on your mobile uPort app in few seconds.'}
    </Section>
  );
}

const connected = connect('user', UserContext.Consumer, ConnectTwitter);
const routered = withRouter(connected);

export default routered;
