const fs = require('fs');

const env = process.env.npm_config_env || 'prod';
const configSrcFile = `./src/config/${env}.json`;
const destinationFilePath = './src/config/index.ts';
const formatters = {};

formatters.object = (value) => JSON.stringify(value).replace(/"/g, '\'');

formatters.string = (value) => `'${value}'`;

function formatValue(value) {
  const type = typeof value;
  return formatters[type] ? formatters[type](value) : value;
}

function buildTemplate(constants) {
  return `export const environment = {\n  ${constants.join(',\n  ')},\n};\n`;
}

function mapConstants(json) {
  return Object.keys(json).map((key) => `${key.includes(' ') ? `'${key}'` : key}: ${formatValue(json[key]) || "''"}`);
}

function parseJsonToConstants(json) {
  const constants = mapConstants(json);
  return buildTemplate(constants);
}

function onReadFile(error, fileContent) {
  // eslint-disable-next-line no-console
  if (error) console.log(error);
  const content = parseJsonToConstants(JSON.parse(fileContent));
  // eslint-disable-next-line no-console
  fs.writeFile(destinationFilePath, content, { encoding: 'utf8' }, (err) => { if (err) { console.log(err); } });
}
fs.readFile(configSrcFile, 'utf8', onReadFile);
