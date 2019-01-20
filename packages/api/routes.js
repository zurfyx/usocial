const express = require('express');
const { transport, message } = require('uport-transports');
const { Credentials } = require('uport-credentials');
const isEmail = require('validator/lib/isEmail');
const { credentials, emailDisclosureRequest, pushAttestation } = require('./uport');
const { host } = require('./utils/ngrok');

const router = express.Router();

const OK = (res) => res.json({ message: 'OK' });

router.get('/', (req, res) => {
  OK(res);
});

router.post('/connect/email', async (req, res) => {
  const email = req.body.email;
  if (!isEmail(email)) {
    return res.status(400).json({ error: 'Not a valid email address.'})
  }

  const baseUrl = process.env.REACT_APP_API || await host();
  const callbackUrl = `${baseUrl}/connect/email/callback?email=${email}`;
  await emailDisclosureRequest(email, callbackUrl);

  OK(res);
});

router.post('/connect/email/callback', async (req, res) => {
  const jwt = req.body.access_token;
  const email = req.query.email;

  await pushAttestation(jwt, 'email', email);

  OK(res);
});

router.post('/callback', async (req, res) => {
  const jwt = req.body.access_token;
  const creds = await credentials.authenticateDisclosureResponse(jwt);
  const did = creds.did
  const pushToken = creds.pushToken
  const pubEncKey = creds.boxPub
  const push = transport.push.send(pushToken, pubEncKey)
  const att = await credentials.createVerification({
    sub: did,
    exp: Math.floor(new Date().getTime() / 1000) + 365 * 24 * 60 * 60,
    claim: {
      'usocialIdentity': { 'foo': '6' },
    },
  });
  console.info('att', att)
  const ok = await push(att);
  console.info('ok', ok);

  res.send('OK');
});


const { did, privateKey } = Credentials.createIdentity();
const guestCredentials = new Credentials({
  appName: 'Guest',
  network: 'rinkeby',
  privateKey,
});

router.get('/guest/token', async (req, res) => {
  const callbackUrl = process.env.REACT_APP_API || await host();
  const requestToken = await guestCredentials.createDisclosureRequest({
    notifications: true,
    callbackUrl: `${callbackUrl}/guest/verifications`,
    verified: ['usocialIdentity']
  });
  const uri = message.util.paramsToQueryString(message.util.messageToURI(requestToken));
  console.info(uri)
  res.send(uri)
});

router.post('/guest/verifications', async (req, res) => {
  const jwt = req.body.access_token;
  const identity = await guestCredentials.authenticateDisclosureResponse(jwt);
  console.info(identity);
});

module.exports = router;
