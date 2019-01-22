/**
 * Guest demo source code
 */
const { message } = require('uport-transports');
const { Credentials } = require('uport-credentials');

const { did, privateKey } = Credentials.createIdentity();
const guestCredentials = new Credentials({
  appName: 'Guest',
  network: 'rinkeby',
  privateKey,
});

async function guestToken(req, res) {
  const callbackUrl = process.env.REACT_APP_API || await host();
  const requestToken = await guestCredentials.createDisclosureRequest({
    notifications: true,
    callbackUrl: `${callbackUrl}/guest/verifications`,
    verified: ['usocialIdentity']
  });
  const uri = message.util.paramsToQueryString(message.util.messageToURI(requestToken));
  console.info(uri)
  res.send(uri)
}

async function guestVerifications(req, res) {
  const jwt = req.body.access_token;
  const identity = await guestCredentials.authenticateDisclosureResponse(jwt);
  console.info(identity);
}

module.exports = {
  guestToken,
  guestVerifications,
};
