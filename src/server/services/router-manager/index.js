import ServiceBase from '../ServiceBase';
//========================================
import MainRouter from '../../routers/main-router';

export default class RouterManager extends ServiceBase {
  static $name = 'routerManager';
  static $type = 'service';
  static $inject = ['httpApp'];

  constructor(httpApp){
    super();
    let routers = [MainRouter]
    .map(Router => new Router({}).setupRoutes(httpApp.appConfig));
  }

  onStart(){
  }
}
