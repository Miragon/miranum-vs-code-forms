// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

const absolutePath = 'https://file%2B.vscode-resource.vscode-cdn.net'
    + path.resolve('./dist/fonts/materialdesignicons-webfont.');

let fileString = fs.readFileSync('./dist/css/chunk-vendors.css').toString();
fileString = fileString.replace(/\/fonts\/materialdesignicons-webfont./g, absolutePath);

fs.writeFileSync('./dist/css/chunk-vendors.css', fileString);