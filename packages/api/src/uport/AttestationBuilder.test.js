const AttestationBuilder = require('./AttestationBuilder');

test('adds one', () => {
  const builder = new AttestationBuilder();
  builder.addOne('email', 'foo@example.com');

  expect(builder.values).toEqual({
    'email': ['foo@example.com'],
  });
});

test('adds many', () => {
  const builder = new AttestationBuilder();
  builder.addMany({
    email: ['foo@example.com', 'bar@example.com'],
    facebook: ['123'],
  });

  expect(builder.values).toEqual({
    email: ['foo@example.com', 'bar@example.com'],
    facebook: ['123'],
  });
});

test('adds one and many', () => {
  const builder = new AttestationBuilder()
    .addOne('email', 'foo@example.com')
    .addMany({ email: ['bar@example.com'] });

  expect(builder.values).toEqual({
    email: ['foo@example.com', 'bar@example.com'],
  });
});

test('adds duplicated, only 1 is kept', () => {
  const builder = new AttestationBuilder()
    .addOne('email', 'foo@example.com')
    .addMany({ email: ['foo@example.com', 'foo@example.com'] });

  expect(builder.values).toEqual({
    email: ['foo@example.com'],
  });
});

test('values are stringified', () => {
  const builder = new AttestationBuilder()
    .addMany({ facebook: [123] });

  expect(builder.values).toEqual({
    facebook: ['123'],
  });
});

test('add many as undefined or null makes no changes', () => {
  const builders = [
    new AttestationBuilder().addMany(),
    new AttestationBuilder().addMany(null),
    new AttestationBuilder().addMany(undefined),
  ];
  
  builders.forEach((builder) => {
    expect(builder.values).toEqual({});
  });
});

test('add many as empty object makes no changes', () => {
  const builder = new AttestationBuilder()
    .addMany();

  expect(builder.values).toEqual({});
})
