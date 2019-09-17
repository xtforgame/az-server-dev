import http from 'http';
import https from 'https';
import httpShutdownExtension from 'http-shutdown';

export default (app, credentials, cb, httpPort = 80, httpsPort = 443) => {
  const httpServer = httpShutdownExtension(http.createServer(app.callback()));
  // const httpServer = httpShutdownExtension(http.createServer((req, res) => {
  //   const { host } = req.headers;
  //   if (!host) {
  //     res.writeHead(400, {});
  //     return res.end();
  //   }
  //   const newHost = host.replace(`:${httpPort}`, `:${httpsPort}`);
  //   res.writeHead(301, { Location: `https://${newHost}${req.url}` });
  //   return res.end();
  // }));
  const httpsServer = httpShutdownExtension(https.createServer(credentials, app.callback()));
  httpServer.listen(httpPort, () => {
    httpsServer.listen(httpsPort, () => {
      if (cb) {
        cb(httpServer, httpsServer);
      }
    });
  });
};
