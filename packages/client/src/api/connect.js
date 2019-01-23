import { fetchGet, fetchPost } from './fetch';

function connectEmail(email, name = '') {
  return fetchPost('/connect/email', {
    email,
    name,
  });
}

function connectFacebook(facebookCode, uportPush) {
  const path = '/connect/facebook';
  const params = new URLSearchParams({
    code: facebookCode,
    ...uportPush,
  });
  const fullPath = `${path}?${params.toString()}`;
  return fetchGet(fullPath);
}

function connectGoogle(googleCode, uportPush) {
  const path = '/connect/google';
  const params = new URLSearchParams({
    code: googleCode,
    ...uportPush,
  });
  const fullPath = `${path}?${params.toString()}`;
  return fetchGet(fullPath);
}

async function connectTwitterOauthToken() {
  const request = await fetchGet('/connect/twitter/oauth-token');
  const json = await request.json();
  return json.oauthToken;
}

function connectTwitter(twitterCode, twitterVerifier, uportPush) {
  const path = '/connect/twitter';
  const params = new URLSearchParams({
    oauth_token: twitterCode,
    oauth_verifier: twitterVerifier,
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
