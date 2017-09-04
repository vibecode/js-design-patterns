//The Proxy pattern provides a surrogate or placeholder object for another object and controls access to this other object.

//In the example below StorageProxy optimizes potentially slow searching process by providing caching mechanism for repeated requests

class Storage {
  constructor() {
    this.storage = [/*over 9000 PEPE*/ 'RARE PEPE'];
  }

  getItem(request) {
    return this.storage.filter(item => item === request)[0];
  }
}

class StorageProxy {
  constructor(storage) {
    this.storage = storage;
    this.cache = {};
  }

  getItem(request) {
    if (!this.cache[request]) {
      this.cache[request] = this.storage.getItem(request);
    }

    return this.cache[request];
  }
}

const storage = new Storage();
const storageProxy = new StorageProxy(storage);

storageProxy.getItem('RARE PEPE');
storageProxy.getItem('RARE PEPE');
console.log(storageProxy.cache);
