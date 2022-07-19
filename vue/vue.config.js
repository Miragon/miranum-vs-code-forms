const path = require('path');

module.exports = {
  transpileDependencies: [
    'vuetify',
    '@koumoul/vjsf'
  ],
  filenameHashing: false,
  outputDir: path.resolve(__dirname, "../dist-vue"),
};
