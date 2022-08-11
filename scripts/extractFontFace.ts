// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

/**
 * Vuetify generates one css file (./dist/css/chunk-vendors.css) with all the required styling.
 * It also uses local fonts for the icons (./dist/fonts/*).
 * In the css file, these fonts are loaded by specifying the relative path.
 * The vscode-webview cannot handle this path because it only understands a special URI (see https://code.visualstudio.com/api/extension-guides/webview#loading-local-content).
 * We can create this special URI at runtime when the webview is resolved.
 *
 * To replace the relative path with the correct URI, we extract all custom fonts from the original css file and write
 * them to a second css file.
 * The procedure is as follows:
 * 1. Compile Vue-App and generate css file (./dist/css/chunk-vendors.css)
 * 2. Run this script to extract all custom fonts and write it to a second css file (./media/css/vuetify.customFonts.css)
 * 3. At run-time of our extension read this second css file and replace all relative paths with the correct URI.
 */

const regex = /@font-face(.*?)}/g;
const fileString = fs.readFileSync('./dist/css/chunk-vendors.css').toString();
const fontFace = fileString.match(regex);
const writeStream = fs.createWriteStream('./media/css/vuetify.customFonts.css');

writeStream.on('error', (err: Error) => {
    console.log('vuetify.customFonts.css could not be written.', err);
});
fontFace.forEach((fontFace: string) => {
    writeStream.write(fontFace + '\n');
});
writeStream.end();

fs.writeFileSync('./dist/css/chunk-vendors.css', fileString.replace(regex, ''));
