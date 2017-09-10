//The Publish/Subscribe pattern is a variation of the Observer pattern
// it uses a topic/event channel which sits between the objects
// wishing to receive notifications(subscribers)
// and the object firing the event (the publisher).
//The idea here is to avoid dependencies between the subscriber and publisher.

class EventBus {
  constructor() {
    this.subscribers = {};
  }

  on(evType, fn) {
    if (!this.subscribers[evType]) {
      this.subscribers[evType] = [];
    }

    this.subscribers[evType].push(fn);
  }

  remove(evType, fn) {
    this.subscribers[evType] = this.subscribers[evType].filter(
        subscriber => subscriber !== fn
    );
  }

  fire(evType, data) {
    this.subscribers[evType].forEach(subscriber => subscriber(data));
  }
}

class Mouse {
  constructor(evBus) {
    this.eventBus = evBus;
  }

  clickRight() {
    this.eventBus.fire('click', 'right button');
  }

  clickLeft() {
    this.eventBus.fire('click', 'left button');
  }
}

class Keyboard {
  constructor(evBus) {
    this.eventBus = evBus;
  }

  pressTab() {
    this.eventBus.fire('keypress', 'tab');
  }
}

const logger = {
  logClicks: function (button) {
    console.log(`${button} clicked`);
  },
  logKeyPresses: function (key) {
    console.log(`${key} pressed`);
  }
};

const eventBus = new EventBus();

const mouse = new Mouse(eventBus);
const keyBoard = new Keyboard(eventBus);

eventBus.on('click', logger.logClicks);
eventBus.on('keypress', logger.logKeyPresses);

mouse.clickLeft();
mouse.clickRight();

keyBoard.pressTab();

eventBus.remove('keypress', logger.logKeyPresses);
keyBoard.pressTab();

console.log(eventBus.subscribers);
