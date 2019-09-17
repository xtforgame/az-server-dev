/* eslint-disable no-console */
export default class ServiceBase {
  start(containerInterface) {
    console.log('==== start service ==== :', this.constructor.$name);
    return Promise.resolve()
    .then(() => this.onStart && this.onStart(containerInterface));
  }

  destroy(containerInterface) {
    return new Promise((resolve, reject) => {
      try {
        return resolve(this.onDestroy && this.onDestroy(containerInterface));
      } catch (e) {
        return reject(e);
      }
    });
  }
}
