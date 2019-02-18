# uSocial

> uSocial Tools

uSocial DID: `did:ethr:0x68cce4daeb1d7e19e0cdff840f429b1ba5e131c8`

## Features

- Validate attestations
- Verify attestations ownership
- Concatenate attestations like uPort
- Sort attestations
- Extract verified attested values

## Getting started

```
npm install uport-connect # Browser
npm install uport-credentials
npm install usocial
```

**Warning!** This library does not verify attestation JWT (signature, expiration date, creator, ...)

uSocial Tools verify issuer DID, subject and that the attestation format follows our convention.
You should use this library along with uPort credentials to determine the attestations, and to
extract the values from those that were genuinely created by uSocial. 

## Retrieving a list of attested emails through an authenticate request disclosure on the server

Server-side generates disclosure token, requesting usocialIdentity verifications:

[Generate new credentials](https://developer.uport.me/myapps/configurator)

```
import { Credentials } from 'uport-credentials';

const credentials = new Credentials({
  did: xxx,
  privateKey: xxx,
});

const requestJwt: string = await credentials.createDisclosureRequest({
  callbackUrl: 'https://localhost:3000/callback',
  network: 'rinkeby',
  accountType: 'general',
  requested: ['name', 'avatar', 'email'],
  notifications: true,
  verified: ['usocialIdentity'],
});
```

Client-side shows the QR code with the following:

```
import { Connect } from 'uport-connect';

const connect = new uportConnect.Connect('InVID', {
  network: 'rinkeby',
  accountType: 'general',
});

connect.send(theServerSideToken, 'disclosureReq');
```

Server-side reads the final JWT token back which constain the user attestations:

USOCIAL_DID: `<written at the top of the page>`

```
import { attestedEmails } from 'usocial';

const credentials = <same as step 1>
const accessToken = req.body['access_token'];
const profile = await credentials.authenticateDisclosureResponse(accessToken);

const verifiedEmails = attestedEmails(profile.verified, { sub: profile.did, iss: USOCIAL_DID });
let email: string;
if (verifiedEmails.includes(profile.email)) {
  email = profile.email;
} else if (verifiedEmails.length > 0) {
  email = verifiedEmails[0];
} else {
  email = null;
}
console.info(`Best email for user ${profile.did} => ${email}`);
```

## Retrieving a list of arbitrary attested data through an authenticate request disclosure on the server

Step 1-2. Just like before.

Step 3. Server-side reads the final JWT token back which constain the user attestations:

USOCIAL_DID: `<written at the top of the page>`

```
import { attestedValuesByPlatform } from 'usocial';

const credentials = <same as step 1>
const accessToken = req.body['access_token'];
const profile = await credentials.authenticateDisclosureResponse(accessToken);

const verifiedValues = attestedValuesByPlatform(profile.verified, 'facebook', { sub: profile.did, iss: USOCIAL_DID });
console.info(`Verified values for user ${profile.did} => ${verifiedValues}`);
```

## Valid/Verified attestation through an authenticate request disclosure on the server

- **Valid attestation**: follows uSocial format.
- **Verified attestation**: a valid attestation + the issuer (ISS) and the subject (SUB) are match Usocial Identity and the
passed subject (i.e. the uPort user who signed the disclosure request `(await credentials.authenticateDisclosureResponse(accessToken)).did`).

Step 1-2. Just like before.

Step 3. Server-side reads the final JWT token back which constain the user attestations:

```
import { attestedValuesByPlatform } from 'usocial';

const credentials = <same as step 1>
const accessToken = req.body['access_token'];
const profile = await credentials.authenticateDisclosureResponse(accessToken);

if (!validateAttestation(profile.verified[0])) {
  throw new Error('Attestation is not valid');
}

// Verify attestation already includes validateAttestation. Use either one or the other.
if (!verifyAttestation(profile.verified[0], { sub: profile.did, iss: USOCIAL_DID })) {
  throw new Error('Attestation is not valid');
}
```

## Determining the most current attestation

The most current attestation is the newest verified attestation.

Step 1-2. Just like before.

Step 3. Server-side reads the final JWT token back which constain the user attestations:

```
import { attestedValuesByPlatform } from 'usocial';

const credentials = <same as step 1>
const accessToken = req.body['access_token'];
const profile = await credentials.authenticateDisclosureResponse(accessToken);

// If no verified attestation can be found, null is returned.
const attestation = currentAttestation(profile.verified[0], { sub: profile.did, iss: USOCIAL_DID });
if (attestation) {
  console.info(attestation.claim);
}
```

## License

MIT © Gerard Rovira Sánchez