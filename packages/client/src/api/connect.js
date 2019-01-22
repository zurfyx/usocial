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

export {
  connectEmail,
  connectFacebook,
};
