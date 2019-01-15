const { Credentials } = require('uport-credentials');
const { message } = require('uport-transports');

const credentials = new Credentials({
  appName: 'uSocial Identity',
  network: 'rinkeby',
  privateKey: process.env.UPORT_PRIVATE_KEY,
});

async function emailDisclosureRequest() {
  const requestToken = await credentials.createDisclosureRequest({
    notifications: true,
    // callbackUrl: `${process.env.REACT_APP_API}/callback`,
    callbackUrl: 'https://da8e98d8.ngrok.io/callback',
  });
  const uri = message.util.paramsToQueryString(message.util.messageToURI(requestToken));
  console.info(uri)
}
emailDisclosureRequest();

module.exports = {
  credentials,
  emailDisclosureRequest,
};
