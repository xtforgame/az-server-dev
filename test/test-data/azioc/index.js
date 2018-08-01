import { ServiceBase } from '../../../src/server/azioc';


export class Class0NoName extends ServiceBase {
  static $type = 'service';
}

export class Class1 extends ServiceBase {
  static $name = 'class1';

  static $type = 'service';

  constructor() {
    super();
    this.state = 'created';
  }

  onStart() {
    return new Promise(resolve => setTimeout(resolve, 1000))
    .then(() => {
      this.state = 'started';
    });
  }
}

export class Class2Dep1 extends ServiceBase {
  static $name = 'class2Dep1';

  static $type = 'service';

  static $inject = ['class1'];

  constructor(class1) {
    super();
    this.class1 = class1;
  }

  onStart() {
    return new Promise(resolve => setTimeout(resolve, 1000))
    .then(() => {
      this.state = 'started';
    });
  }
}

export class Class3StartDep1 extends ServiceBase {
  static $name = 'class3Dep1';

  static $type = 'service';

  static $startDeps = ['class1'];

  onStart(containerInterface) {
    return new Promise(resolve => setTimeout(resolve, 1000))
    .then(() => {
      this.class1 = containerInterface.get(Class1.$name);
      this.state = 'started';
    });
  }
}
