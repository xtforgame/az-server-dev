import ServiceBase from '../ServiceBase';
import { httpPort, httpsPort } from '../../core/config';
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
      runServer(this.app, this.credentials, resolve, httpPort, httpsPort);
    });
  }
}

