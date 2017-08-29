//ES5 version;
const Singleton = (function () {
  let instance;

  let privateVar = 'My own private Idaho';

  function showPrivate() {
    console.log(privateVar);
  }

  function init() {
    return {
      publicMethod: function() {
        showPrivate();
      },
      publicVar: 'My own public Idaho'
    }
  }

  return {
    getInstance: function() {
      if (!instance) {
        instance = init();
      }

      return instance;
    }
  }
})();

const ton1 = Singleton.getInstance();
const ton2 = Singleton.getInstance();
console.log(ton1 === ton2);

//ES6
class SingletonES6 {
  constructor(){
    if(!SingletonES6.instance){
      SingletonES6.instance = this;
    }

    this.data = "Singleton";
    return SingletonES6.instance;
  }
}

const single1 = new SingletonES6();
const single2 = new SingletonES6();
console.log(single1 === single2);

//or
// class SingletonModule {
//   constructor() {
//     this.state = 'My own private Idaho';
//   }
// }
//
// export default new SingletonModule();
