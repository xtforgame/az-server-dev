import RouterBase from '../core/router-base';

export default class MainRouter extends RouterBase {
  setupRoutes({ router }) {
    // Get state.
    router.get('/api', (ctx, next) => ctx.body = 'test');
  }
}
