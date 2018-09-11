import path from 'path';
import appRootPath from 'app-root-path';

const appRoot = appRootPath.resolve('./');
const secretsFolder = path.join(appRoot, 'dev-secrets');

const credentialFiles = {
  basePath: path.join(secretsFolder, 'ssl'),
  key: 'privatekey.pem',
  cert: 'certificate.pem',
};

const httpPort = 8080;
const httpsPort = 8443;

export {
  credentialFiles,
  httpPort,
  httpsPort,
};
