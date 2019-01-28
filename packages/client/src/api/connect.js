import { fetchGet, fetchPost } from './fetch';

function connectEmail(email, name = '') {
  return fetchPost('/connect/email', {
    email,
    name,
  });
}

async function connectFacebook(facebookCode, uportPush, attestedJwt) {
  const path = '/connect/facebook';
  const params = new URLSearchParams({ code: facebookCode });
  const fullPath = `${path}?${params.toString()}`;
  const request = await fetchPost(fullPath, {
    ...uportPush,
    attested: attestedJwt,
  });
  const json = await request.json();
  return json;
}

async function connectGoogle(googleCode, uportPush, attestedJwt) {
  const path = '/connect/google';
  const params = new URLSearchParams({ code: googleCode });
  const fullPath = `${path}?${params.toString()}`;
  const request = await fetchPost(fullPath, {
    ...uportPush,
    attested: attestedJwt,
  });
  const json = await request.json();
  return json;
}

async function connectTwitterOauthToken() {
  const request = await fetchGet('/connect/twitter/oauth-token');
  const { oauthToken, encryptedSecretStore } = await request.json();
  return { oauthToken, encryptedSecretStore };
}

function connectTwitter(twitterCode, twitterVerifier, encryptedSecretStore, uportPush) {
  const path = '/connect/twitter';
  const params = new URLSearchParams({
    oauth_token: twitterCode,
    oauth_verifier: twitterVerifier,
    encryptedSecretStore,
    ...uportPush,
  });
  const fullPath = `${path}?${params.toString()}`;
  return fetchGet(fullPath);
}

export {
  connectEmail,
  connectFacebook,
  connectGoogle,
  connectTwitterOauthToken,
  connectTwitter,
};
