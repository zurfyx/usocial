import {
  validateAttestation,
  verifyAttestation,
  sortAttestations,
  currentAttestation,
} from "./tools";

const SAMPLE_ATTESTATIONS = [
   {
      "iat":1548675530,
      "sub":"did:ethr:0x47254494e3ede9bb7e97cc306fc7a6065ed923ef",
      "claim":{
         "usocialIdentity":{
            "facebook":[
               "10213829113183103"
            ],
            "google":[
               "117467156632237647859"
            ],
            "twitter":[
               "2328935980"
            ],
            "email":[
               "gerard.rovira.sanchez@gmail.com"
            ]
         }
      },
      "exp":1580211530,
      "iss":"did:ethr:0xccdaa2972d2546dbd77adddcceaefb2633f582a0",
      "jwt":"eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1NDg2NzU1MzAsInN1YiI6ImRpZDpldGhyOjB4NDcyNTQ0OTRlM2VkZTliYjdlOTdjYzMwNmZjN2E2MDY1ZWQ5MjNlZiIsImNsYWltIjp7InVzb2NpYWxJZGVudGl0eSI6eyJmYWNlYm9vayI6WyIxMDIxMzgyOTExMzE4MzEwMyJdLCJnb29nbGUiOlsiMTE3NDY3MTU2NjMyMjM3NjQ3ODU5Il0sInR3aXR0ZXIiOlsiMjMyODkzNTk4MCJdLCJlbWFpbCI6WyJnZXJhcmQucm92aXJhLnNhbmNoZXpAZ21haWwuY29tIl19fSwiZXhwIjoxNTgwMjExNTMwLCJpc3MiOiJkaWQ6ZXRocjoweGNjZGFhMjk3MmQyNTQ2ZGJkNzdhZGRkY2NlYWVmYjI2MzNmNTgyYTAifQ.C3sEcxi0i5hzQEzdZQm-wgA5iK_eHx-UbOQh6pjr_VelXJc7e6KIdfMn_P-vE4TNzVPlCq3KYQyQtDJGhG2JzwE"
   },
   {
      "iat":1548671696,
      "sub":"did:ethr:0x47254494e3ede9bb7e97cc306fc7a6065ed923ef",
      "claim":{
         "usocialIdentity":{
            "facebook":[
               "10213829113183103"
            ],
            "google":[
               "117467156632237647859"
            ]
         }
      },
      "exp":1580207696,
      "iss":"did:ethr:0xccdaa2972d2546dbd77adddcceaefb2633f582a0",
      "jwt":"eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1NDg2NzE2OTYsInN1YiI6ImRpZDpldGhyOjB4NDcyNTQ0OTRlM2VkZTliYjdlOTdjYzMwNmZjN2E2MDY1ZWQ5MjNlZiIsImNsYWltIjp7InVzb2NpYWxJZGVudGl0eSI6eyJmYWNlYm9vayI6WyIxMDIxMzgyOTExMzE4MzEwMyJdLCJnb29nbGUiOlsiMTE3NDY3MTU2NjMyMjM3NjQ3ODU5Il19fSwiZXhwIjoxNTgwMjA3Njk2LCJpc3MiOiJkaWQ6ZXRocjoweGNjZGFhMjk3MmQyNTQ2ZGJkNzdhZGRkY2NlYWVmYjI2MzNmNTgyYTAifQ._JGgT1M47jYgIWrsbE8qcn_UFP2kqnuxOMhwoefL1cJwCu8kIqaMuUz3o9QSkrk4Ch0t3OeiElhlz3-SvNq_JAE"
   },
   {
      "iat":1548668152,
      "sub":"did:ethr:0x47254494e3ede9bb7e97cc306fc7a6065ed923ef",
      "claim":{
         "usocialIdentity":{
            "facebook":[
               "10213829113183103"
            ]
         }
      },
      "exp":1580204152,
      "iss":"did:ethr:0xccdaa2972d2546dbd77adddcceaefb2633f582a0",
      "jwt":"eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1NDg2NjgxNTIsInN1YiI6ImRpZDpldGhyOjB4NDcyNTQ0OTRlM2VkZTliYjdlOTdjYzMwNmZjN2E2MDY1ZWQ5MjNlZiIsImNsYWltIjp7InVzb2NpYWxJZGVudGl0eSI6eyJmYWNlYm9vayI6WyIxMDIxMzgyOTExMzE4MzEwMyJdfX0sImV4cCI6MTU4MDIwNDE1MiwiaXNzIjoiZGlkOmV0aHI6MHhjY2RhYTI5NzJkMjU0NmRiZDc3YWRkZGNjZWFlZmIyNjMzZjU4MmEwIn0.r7UvdKK_0EG8ZQHkGoYaA_5YcKCL2E7Mq_MMBImx8xvnifoNs3KeC6ziyldnObDC_cJiqydMZboBPZ_inS3a5wA"
   }
];

const copySampleAttestations = () => JSON.parse(JSON.stringify(SAMPLE_ATTESTATIONS));

test('attestion is valid if claim has uSocialIdentity format', () => {
  const INVALID = [
    {
      notUsocial: {
        facebook: ['123']
      }
    },
    {
      usocialIdentity: {
        facebook: '123',
      },
    },
    {
      usocialIdentity: {
        facebook: [{ nested: '' }],
      },
    }
  ].map((claim) => ({
    ...copySampleAttestations()[0],
    claim,
  }));

  INVALID.forEach((attestation) => {
    expect(validateAttestation(attestation)).toBe(false);
  });

  const VALID = copySampleAttestations()[0];
  expect(validateAttestation(VALID)).toBe(true);
});

test('attestation is verified if iss matches uSocial\'s', () => {
  const badAttestation = copySampleAttestations()[0];
  badAttestation.iss = '0xfoo';
  expect(verifyAttestation(badAttestation)).toBe(false);

  const goodAttestation = copySampleAttestations()[0];
  expect(verifyAttestation(goodAttestation)).toBe(true);
});

test('verified attestions have to be valid', () => {
  const attestation = copySampleAttestations()[0];
  delete attestation.jwt;
  expect(verifyAttestation(attestation)).toBe(false);
});

test('attestations are sorted by IAT descendent', () => {
  const sorted1 = sortAttestations(SAMPLE_ATTESTATIONS);
  expect(sorted1[0].iat).toBe(1548675530);
  expect(sorted1[1].iat).toBe(1548671696);
  expect(sorted1[2].iat).toBe(1548668152);

  const attestations2 = [
    SAMPLE_ATTESTATIONS[2],
    SAMPLE_ATTESTATIONS[0],
    SAMPLE_ATTESTATIONS[1],
  ];
  const sorted2 = sortAttestations(attestations2);
  expect(sorted2[0].iat).toBe(1548675530);
  expect(sorted2[1].iat).toBe(1548671696);
  expect(sorted2[2].iat).toBe(1548668152);
});

test('current attestation chooses most recent verified', () => {
  const badAttestation = copySampleAttestations()[0];
  badAttestation.iss = '0xfoo'; // Valid but not verified

  const attestations = [
    badAttestation,
    ...SAMPLE_ATTESTATIONS,
  ];
  expect(currentAttestation(attestations)).toEqual(SAMPLE_ATTESTATIONS[0]);
});

test('current attestation returns undefined if no attestations', () => {
  expect(currentAttestation([])).toBe(undefined);
});

test('current attestation returns undefined none is valid', () => {
  const attestations = [
    {
      notUsocial: {
        facebook: ['123']
      }
    },
  ];
  expect(currentAttestation(attestations)).toBe(undefined);
});
