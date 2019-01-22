const express = require('express');
const { transport, message } = require('uport-transports');
const { Credentials } = require('uport-credentials');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const isEmail = require('validator/lib/isEmail');
const { emailDisclosureRequest, pushAttestation, pushAttestationFromJwt } = require('./uport');
const { host } = require('./utils/ngrok');

const router = express.Router();

const OK = (res) => res.json({ message: 'OK' });
const ERR400 = (res, error) => res.status(400).json({ error })

router.get('/', (req, res) => {
  OK(res);
});

router.post('/connect/email', async (req, res) => {
  const { email, name } = req.body;
  if (!isEmail(email)) {
    return ERR400(res, 'Not a valid email address.');
  }

  const baseUrl = process.env.REACT_APP_API || await host();
  const callbackUrl = `${baseUrl}/connect/email/callback?email=${email}`;
  await emailDisclosureRequest(email, callbackUrl, name);

  OK(res);
});

router.post('/connect/email/callback', async (req, res) => {
  const jwt = req.body.access_token;
  const email = req.query.email;

  await pushAttestationFromJwt(jwt, 'email', email);

  OK(res);
});

passport.use('facebook', new FacebookStrategy({
  clientID: process.env.REACT_APP_FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: `${process.env.REACT_APP_CLIENT || 'http://localhost:3000'}/dashboard/connect/facebook`,
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));

router.get('/connect/facebook', async (req, res, next) => {
  const pushData = {
    did: req.query.did,
    pushToken: req.query.pushToken,
    publicEncKey: req.query.publicEncKey,
  };
  console.info(pushData)

  passport.authenticate('facebook', async (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return ERR400(res, 'Got an empty Facebook user object.');
    }
    
    await pushAttestation(pushData, 'facebook', user.id);

    OK(res);
  })(req, res, next);
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
