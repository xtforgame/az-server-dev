import ServiceBase from '../ServiceBase';
import { httpPort, httpsPort } from 'config';
import Koa from 'koa';
import createRouterClass from 'generic-router';
import bodyParser from 'koa-bodyparser';
import { runServer } from './http-server';
import { RestfulError } from 'az-restful-helpers';
import http from 'http';

let methods = http.METHODS.map(function lowerCaseMethod (method) {
  return method.toLowerCase();
});

export default class HttpApp extends ServiceBase {
  static $name = 'httpApp';
  static $type = 'service';
  static $inject = ['envCfg'];

  constructor(envCfg){
    super();
    this.app = new Koa();
    // prevent any error to be sent to user
    this.app.use((ctx, next) => {
      return next().catch((err) => {
        if(err instanceof RestfulError){
          return err.koaThrow(ctx);
        }
        // console.log('err.restfulError :', err.restfulError);
        if(!err.status){
          console.error(err);
          console.error(err.stack);
          ctx.throw(500);
        }
        throw err;
      });
    });
    this.app.use(bodyParser());
    /*let credentials = */this.credentials = envCfg.credentials;

    let KoaRouter = createRouterClass({
      methods,
    });
    this.router = new KoaRouter();
    this.app
    .use(this.router.routes())
    .use(this.router.allowedMethods());

    this.appConfig = {
      router: this.router/*, app: this.app, azLrApp, credentials*/
    };
  }

  onStart(){
    //======================================================
    return new Promise(resolve => {
      runServer(this.app, this.credentials, (httpServer, httpsServer) => resolve({httpServer, httpsServer}), httpPort, httpsPort)
    })
    .then(({httpServer, httpsServer}) => {
      this.httpServer = httpServer;
      this.httpsServer = httpsServer;
    });
  }

  onDestroy(){
    return new Promise(resolve => {
      if(!this.httpServer){
        return ;
      }
      this.httpServer.shutdown(() => {
        this.httpServer = null;
        resolve();
      });
      return new Promise(resolve => {
        if(!this.httpsServer){
          return ;
        }
        this.httpsServer.shutdown(() => {
          this.httpsServer = null;
          resolve();
        });
      });
    })
    .then(() => {
      console.log('Everything is cleanly shutdown.');
    });
  }
}

