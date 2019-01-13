import { Connect } from 'uport-connect';

const uport = new Connect('uSocial', {
  network: 'rinkeby',
  accountType: 'general',
});

async function requestDisclosure() {
  const disclosure = {
    requested: ['name', 'email'],
    networkId: 0x4,
    notifications: true,
  };
  const disclosureId = 'disclosureReq';

  return new Promise(async (resolve) => {
    uport.requestDisclosure(disclosure, disclosureId);
    const data = await uport.onResponse(disclosureId);
    const payload = data.payload;
    resolve(payload);
  });
}

export {
  requestDisclosure,
};
