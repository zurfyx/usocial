const isEmail = require('validator/lib/isEmail');
const jwtDecode = require('jwt-decode');
const url = require('url');
const { host } = require('../utils/ngrok');
const { ok, err400 } = require('../utils/router');
const { emailDisclosureRequest, pushAttestationFromDisclosureRequest, verifyAttestation } = require('../uport');
const AttestationBuilder = require('../uport/AttestationBuilder');

async function connectEmail(req, res) {
  const { email, name } = req.body;
  if (!isEmail(email)) {
    return err400(res, 'Not a valid email address.');
  }
  
  const attestedObj = req.body.attested && await verifyAttestation(req.body.attested);
  const attestedJson = JSON.stringify(attestedObj);

  const baseUrl = process.env.REACT_APP_API || await host();
  const callbackUrl = `${baseUrl}/connect/email/callback?email=${email}&attested=${attestedJson}`;
  await emailDisclosureRequest(email, callbackUrl, name);

  ok(res);
};

async function connectEmailCallback(req, res) {
  const attestedObj = JSON.parse(req.query.attested); // Validated in connectEmail()
  const disclosureJwt = req.body.access_token;

  // pushAttestationFromDisclosureRequest will validate JWT before pushing
  const requestJwt = jwtDecode(disclosureJwt).req;
  const callbackUrl = jwtDecode(requestJwt).callback;
  const callbackEmail = url.parse(callbackUrl, true).query.email;

  const attestationBuilder = new AttestationBuilder()
    .addMany(attestedObj && attestedObj.claim.usocialIdentity)
    .addOne('email', callbackEmail);
  const attestationValues = attestationBuilder.values;

  await pushAttestationFromDisclosureRequest(disclosureJwt, attestationValues);

  ok(res);
}

module.exports = {
  connectEmail,
  connectEmailCallback,
};
