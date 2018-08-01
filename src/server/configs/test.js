import path from 'path';

const credentialFiles = {
  basePath: path.join(__dirname, '..', 'ssl/development/self-signed'),
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
