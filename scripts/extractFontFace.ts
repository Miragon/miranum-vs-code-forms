// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

const regex = /@font-face(.*?)}/g;
const fileString = fs.readFileSync('./dist/css/chunk-vendors.css').toString();
const fontFace = fileString.match(regex);
const writeStream = fs.createWriteStream('./media/css/fontFace.generated.css');

writeStream.on('error', (err: Error) => {
    console.log('FontFace.css could not be written.', err);
});
fontFace.forEach((fontFace: string) => {
    writeStream.write(fontFace + '\n');
});
writeStream.end();

fs.writeFileSync('./dist/css/chunk-vendors.css', fileString.replace(regex, ''));
