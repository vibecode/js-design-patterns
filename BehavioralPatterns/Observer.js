// Define a one-to-many dependency between objects
// so that when one object changes state, all its dependents are notified and updated automatically.

// The Observer pattern offers a subscription model in which objects subscribe to an event and get notified when the event occurs. This pattern is the cornerstone of event driven programming, including JavaScript. The Observer pattern facilitates good object-oriented design and promotes loose coupling.

// Participants:
//   Subject
//   Observers

class Click {
  constructor() {
    this.handlers = [];
  }

  subscribe(handler) {
    this.handlers.push(handler);
  }

  remove(handlerToRemove) {
    this.handlers = this.handlers.filter(handler => handler !== handlerToRemove);
  }

  fire(data, ctx = window) {
    this.handlers.forEach(handler => handler.call(ctx, data));
  }
}

const clickHandler = function (event) {
  console.log(`fired ${event} on ${this.name}`);
};

const click = new Click();
const ctx1 = { name: 'object 1' };
const ctx2 = { name: 'object 2' };

click.subscribe(clickHandler);
click.fire('event #1', ctx1);
click.remove(clickHandler);
click.fire('event #2', ctx1);
click.subscribe(clickHandler);
click.fire('event #3', ctx2);
