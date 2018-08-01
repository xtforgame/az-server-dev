// https://taylorpetrick.com/blog/post/https-nodejs-letsencrypt

import path from 'path';
import fs from 'fs';
import {
  credentialFiles,
} from 'config';

const {
  basePath,
  key: keyFilename = 'key.pem',
  cert: certFilename = 'cert.pem',
  ca: caFilename,
} = credentialFiles;

const credentials = {
  key: keyFilename && fs.readFileSync(path.join(basePath, keyFilename), 'utf8'),
  cert: certFilename && fs.readFileSync(path.join(basePath, certFilename), 'utf8'),
  ca: caFilename && fs.readFileSync(path.join(basePath, caFilename), 'utf8'),
};

export { credentials as default };
