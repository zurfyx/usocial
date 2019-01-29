const isEmail = require('validator/lib/isEmail');
const jwtDecode = require('jwt-decode');
const url = require('url');
const { host } = require('../utils/ngrok');
const { ok, err400 } = require('../utils/router');
const { disclosureRequest, emailDisclosureRequest, verifyAttestation, pushAttestation } = require('../uport');
const AttestationBuilder = require('../uport/AttestationBuilder');

async function connectEmail(req, res) {
  const { email, name } = req.body;
  if (!isEmail(email)) {
    return err400(res, 'Not a valid email address.');
  }
  
  const attestedJwt = req.body.attested; // We can't verify it yet because we don't know the receiver (subDid)

  const baseUrl = process.env.REACT_APP_API || await host();
  const callbackUrl = `${baseUrl}/connect/email/callback?email=${email}&attested=${attestedJwt}`;
  await emailDisclosureRequest(email, callbackUrl, name);

  ok(res);
};

async function connectEmailCallback(req, res) {
  const disclosureJwt = req.body.access_token;
  const pushData = await disclosureRequest(disclosureJwt);

  const attestedObj = req.query.attested && await verifyAttestation(req.query.attested, pushData.did);

  // disclosureRequest() has already done the appropriate verifications
  const requestJwt = jwtDecode(disclosureJwt).req;
  const callbackUrl = jwtDecode(requestJwt).callback;
  const callbackEmail = url.parse(callbackUrl, true).query.email;

  const attestationBuilder = new AttestationBuilder()
    .addMany(attestedObj && attestedObj.claim.usocialIdentity)
    .addOne('email', callbackEmail);
  const attestationValues = attestationBuilder.values;

  const { attestation } = await pushAttestation(pushData, attestationValues);

  res.json(attestation);
}

module.exports = {
  connectEmail,
  connectEmailCallback,
};
