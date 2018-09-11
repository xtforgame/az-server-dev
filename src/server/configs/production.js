import path from 'path';
import appRootPath from 'app-root-path';

const appRoot = appRootPath.resolve('./');
const secretsFolder = path.join(appRoot, 'secrets');

const credentialFiles = {
  basePath: path.join(secretsFolder, 'ssl'),
  key: 'privatekey.pem',
  cert: 'certificate.pem',
};

const httpPort = 80;
const httpsPort = 443;

export {
  credentialFiles,
  httpPort,
  httpsPort,
};
