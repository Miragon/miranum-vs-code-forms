import path = require("path");
import fs = require('fs');

const absolutePath = 'https://file%2B.vscode-resource.vscode-cdn.net'
    + path.resolve('../dist-vue/fonts/materialdesignicons-webfont.');

let fileString = fs.readFileSync('../dist-vue/css/chunk-vendors.css').toString();
fileString = fileString.replace(/\/fonts\/materialdesignicons-webfont./g, absolutePath);

fs.writeFileSync('../dist-vue/css/chunk-vendors.css', fileString);