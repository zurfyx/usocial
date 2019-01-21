const { Credentials } = require('uport-credentials');
const { transport, message } = require('uport-transports');
const qrcode = require('qrcode');
const { send } = require('../utils/email');
const { qrTemplate } = require('./template');

const credentials = new Credentials({
  appName: 'uSocial Identity',
  network: 'rinkeby',
  privateKey: process.env.UPORT_PRIVATE_KEY,
});

async function emailDisclosureRequest(email, callbackUrl, name = '') {
  const requestToken = await credentials.createDisclosureRequest({
    callbackUrl,
    notifications: true,
  });
  const uri = message.util.paramsToQueryString(message.util.messageToURI(requestToken));
  const qr = await qrcode.toDataURL(uri);
  const subject = 'uSocial email verification';
  const body = await qrTemplate({
    name,
    qr,
    qrLink: uri,
    clientLink: process.env.REACT_APP_CLIENT || 'http://localhost:3000',
  })
  await send(email, subject, body);
}

async function pushAttestation(jwt, key, value) {
  const userCredentials = await credentials.authenticateDisclosureResponse(jwt);
  const did = userCredentials.did;
  const pushToken = userCredentials.pushToken;
  const pubEncKey = userCredentials.boxPub;
  const push = transport.push.send(pushToken, pubEncKey)
  const attestation = await credentials.createVerification({
    sub: did,
    exp: Math.floor(new Date().getTime() / 1000) + 365 * 24 * 60 * 60,
    claim: {
      'usocialIdentity': { [key]: value },
    },
  });
  await push(attestation);
}

module.exports = {
  credentials,
  emailDisclosureRequest,
  pushAttestation,
};
