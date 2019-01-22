const isEmail = require('validator/lib/isEmail');
const { host } = require('../utils/ngrok');
const { ok, err400 } = require('../utils/router');
const { emailDisclosureRequest, pushAttestationFromJwt } = require('../uport');

async function connectEmail(req, res) {
  const { email, name } = req.body;
  if (!isEmail(email)) {
    return err400(res, 'Not a valid email address.');
  }

  const baseUrl = process.env.REACT_APP_API || await host();
  const callbackUrl = `${baseUrl}/connect/email/callback?email=${email}`;
  await emailDisclosureRequest(email, callbackUrl, name);

  ok(res);
};

async function connectEmailCallback(req, res) {
  const jwt = req.body.access_token;
  const email = req.query.email;

  await pushAttestationFromJwt(jwt, 'email', email);

  ok(res);
}

module.exports = {
  connectEmail,
  connectEmailCallback,
};
