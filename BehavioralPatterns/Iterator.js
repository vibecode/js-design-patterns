//Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.

//Allows clients to effectively loop over a collection of objects

//Participants:
//  Client, Iterator, Items

class Iterator {
  constructor(items) {
    this.idx = 0;
    this.items = items;
    this.length = items.length;
  }

  next() {
    if (!this.hasNext()) {
      return null;
    }

    return this.items[this.idx++];
  }

  first() {
    this.reset();
    return this.next();
  }

  hasNext() {
    return this.idx < this.length;
  }

  current() {
    return this.items[this.idx];
  }

  reset() {
    this.idx = 0;
  }
}

const iterator = new Iterator([1, 2, 3]);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

