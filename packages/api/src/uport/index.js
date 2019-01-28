const { Credentials } = require('uport-credentials');
const { transport, message } = require('uport-transports');
const qrcode = require('qrcode');
const jwtDecode = require('jwt-decode');
const { send } = require('../utils/email');
const { qrTemplate } = require('./template');

const ISS_DID = process.env.REACT_APP_UPORT_DID;

const credentials = new Credentials({
  appName: 'uSocial Identity',
  network: 'rinkeby',
  did: ISS_DID,
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

async function pushAttestation({
  did,
  pushToken,
  publicEncKey,
}, values) {
  const push = transport.push.send(pushToken, publicEncKey);
  const attestationJwt = await credentials.createVerification({
    sub: did,
    exp: Math.floor(new Date().getTime() / 1000) + 1 * 24 * 60 * 60,
    claim: {
      'usocialIdentity': values,
    },
  });
  const attestationObject = {
    ...jwtDecode(attestationJwt),
    jwt: attestationJwt, // Mimic Uport Connect which carries the JWT version with it as well
  };
  const pushReceipt = await push(attestationJwt);

  return { attestation: attestationObject, pushReceipt };
}

/**
 * JWT is validated and used to extract uPort information.
 * @param {values} Attestation values
 */
async function pushAttestationFromDisclosureRequest(jwt, values) {
  const userCredentials = await credentials.authenticateDisclosureResponse(jwt);
  const did = userCredentials.did;
  const pushToken = userCredentials.pushToken;
  const publicEncKey = userCredentials.boxPub; // boxPub seems to be equal to publicEncKey for uPort (uport-transport @ push.js L42)

  return pushAttestation({ did, pushToken, publicEncKey }, values);
}

/**
 * Verify JWT signature, and DID belongs to us
 * Example return:
 * { did: 'did:ethr:0xccdaa2972d2546dbd77adddcceaefb2633f582a0',
 *   boxPub: undefined,
 *   sub: 'did:ethr:0x47254494e3ede9bb7e97cc306fc7a6065ed923ef',
 *   claim: { usocialIdentity: { facebook: '10213829113183103' } } } 
 */
async function verifyAttestation(jwt) {
  const verified = await credentials.verifyDisclosure(jwt);
  
  if (verified.did !== ISS_DID) {
    throw new Error(`Attestation issuer mismatch. Expected: ${ISS_DID}; Received: ${verified.did}`);
  }

  return verified;
}

module.exports = {
  credentials,
  emailDisclosureRequest,
  pushAttestation,
  pushAttestationFromDisclosureRequest,
  verifyAttestation,
};
