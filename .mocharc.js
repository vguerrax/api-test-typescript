module.exports = {
  reporter: 'mocha-multi-reporters',
  'reporter-option': 'configFile=../../reporterConfig.json',
  spec: ["build/test/*.js"]
}