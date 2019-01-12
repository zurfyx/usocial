import { Connect } from 'uport-connect';

const uport = new Connect('uSocial', {
  network: 'rinkeby',
  accountType: 'general',
});

const disclosure = {
  requested: ['name', 'email'],
  networkId: 0x4,
  notifications: true,
};
const disclosureId = 'disclosureReq';

uport.requestDisclosure(disclosure, disclosureId);
uport.onResponse(disclosureId).then((jwt) => {
  console.info(jwt);
});
