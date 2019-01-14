import { Connect } from 'uport-connect';

const connect = (() => {
  let instance;
  return () => {
    instance = instance || new Connect('uSocial', {
      network: 'rinkeby',
      accountType: 'general',
    });
    return instance;
  }
})();

async function requestDisclosure() {
  const disclosure = {
    requested: ['name', 'avatar', 'email'],
    networkId: 0x4,
    notifications: true,
  };
  const disclosureId = 'disclosureReq';

  return new Promise(async (resolve) => {
    connect().requestDisclosure(disclosure, disclosureId);
    const data = await connect().onResponse(disclosureId);
    const payload = data.payload;
    resolve(payload);
  });
}

export {
  requestDisclosure,
};
