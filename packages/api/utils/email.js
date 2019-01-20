const { createTransport } = require('nodemailer');
const inlineBase64 = require('nodemailer-plugin-inline-base64');

const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_SECURE,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  EMAIL_FROM,
} = process.env;

const transporter = createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: EMAIL_SECURE,
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
});
transporter.use('compile', inlineBase64({cidPrefix: 'usocial_'}));

async function send(to, subject, body) {
  const options = {
    to,
    subject,
    html: body,
    from: EMAIL_FROM,
  };

  return transporter.sendMail(options);
}

// Run as `node index.js email foo@example.com` to send a test email on boot.
const argIndex = process.argv.findIndex(key => key === 'email');
if (argIndex !== -1) {
  const to = process.argv[argIndex + 1];
  const subject = 'It works'
  const text = `
  Hello,

  This is a test email.
  `;
  const body = `
  <pre>${text}</pre>
  `;
  
  (async () => {
    await send(to, subject, body);
    console.info(`Test email succesfully sent to ${to}`);
  })();
}

module.exports = {
  send,
};
