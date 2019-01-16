const { Credentials } = require('uport-credentials');
const { message } = require('uport-transports');
const { host } = require('../utils/ngrok');

const credentials = new Credentials({
  appName: 'uSocial Identity',
  network: 'rinkeby',
  privateKey: process.env.UPORT_PRIVATE_KEY,
});

async function emailDisclosureRequest() {
  const callbackUrl = process.env.REACT_APP_API || await host();
  console.info(`Callback URL ${callbackUrl}`)
  const requestToken = await credentials.createDisclosureRequest({
    notifications: true,
    callbackUrl: `${callbackUrl}/callback`,
  });
  const uri = message.util.paramsToQueryString(message.util.messageToURI(requestToken));
  console.info(uri)
}
emailDisclosureRequest();

module.exports = {
  credentials,
  emailDisclosureRequest,
};
