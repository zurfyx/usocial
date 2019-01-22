const util = require('util');
const fs = require('fs');
const path = require('path');
const inlineCss = require('inline-css');

const readFile = util.promisify(fs.readFile);

function loadTemplate(name) {
  return async (variables = {}) => {
    const filePath = path.join(__dirname, name);
    let data = await readFile(filePath, { encoding: 'utf-8'});
    Object.entries(variables).forEach(([findKey, replaceWith]) => {
      const re = new RegExp(`{${findKey}}`, 'g');
      data = data.replace(re, replaceWith);
    });
    data = inlineCss(data, { url: ' ' });
    return data;
  }
}

const qrTemplate = loadTemplate('qr.html');

module.exports = {
  loadTemplate,
  qrTemplate,
};
