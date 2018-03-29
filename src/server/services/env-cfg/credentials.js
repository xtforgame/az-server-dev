// https://taylorpetrick.com/blog/post/https-nodejs-letsencrypt

import path from 'path';
import fs from 'fs';
import {
  credentialFiles,
} from 'config';

let basePath = credentialFiles.basePath;
let keyFilename = credentialFiles.key || 'key.pem';
let certFilename = credentialFiles.cert || 'cert.pem';
let caFilename = credentialFiles.ca;

// let key = fs.readFileSync(path.join(__dirname, '..', '..', 'ssl', 'privatekey.pem'), 'utf8');
// let cert = fs.readFileSync(path.join(__dirname, '..', '..', 'ssl', 'certificate.pem'), 'utf8');
let credentials = {
  key: keyFilename && fs.readFileSync(path.join(basePath, keyFilename), 'utf8'),
  cert: certFilename && fs.readFileSync(path.join(basePath, certFilename), 'utf8'),
  ca: caFilename && fs.readFileSync(path.join(basePath, caFilename), 'utf8'),
};

export {credentials as default};
