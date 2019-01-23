const Cryptr = require('cryptr');

module.exports = new Cryptr(process.env.SECRET);
