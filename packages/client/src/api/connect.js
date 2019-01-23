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

export {
  connectEmail,
  connectFacebook,
  connectGoogle,
};
