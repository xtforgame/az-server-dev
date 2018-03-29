export default class ServiceBase {
  start(containerInterface) {
    return new Promise((resolve, reject) => {
      try {
        return resolve(this.onStart && this.onStart(containerInterface));
      } catch (e) {
        return reject(e);
      }
    });
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
