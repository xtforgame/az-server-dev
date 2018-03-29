import http from 'http';
import https from 'https';
import httpShutdownExtension from 'http-shutdown';

export function runServer(app, credentials, cb, httpPort = 80, httpsPort = 443){
  //const httpServer = http.createServer(app);
  const httpServer = httpShutdownExtension(http.createServer((req, res) => {
    let newHost = req.headers['host'].replace(':' + httpPort, ':' + httpsPort);
    res.writeHead(301, { 'Location': 'https://' + newHost + req.url });
    res.end();
  }));
  const httpsServer = httpShutdownExtension(https.createServer(credentials, app.callback()));
  httpServer.listen(httpPort, () => {
    httpsServer.listen(httpsPort, () => {
      if(cb){
        cb(httpServer, httpsServer);
      }
    });
  });
}
