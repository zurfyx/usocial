const express = require('express');
const { credentials } = require('./uport');
const { transport } = require('uport-transports');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('It works');
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
    claim: { '2+2': '4'},
  });
  console.info('att', att)
  const ok = await push(att);
  console.info('ok', ok);

  res.send('OK');
});

module.exports = router;
