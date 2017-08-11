//ES6 version

class Publisher {
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

const clickBot = new Publisher();

const logger = {
  logClicks: function (button) {
    console.log(`${button} clicked`);
  },
  logKeyPresses: function (key) {
    console.log(`${key} pressed`);
  }
};

clickBot.on('click', logger.logClicks);
clickBot.on('keypress', logger.logKeyPresses);

clickBot.fire('click', 'right button');
clickBot.fire('click', 'left button');
clickBot.fire('keypress', 'tab');

clickBot.remove('keypress', logger.logKeyPresses);
clickBot.fire('keypress', 'tab');
console.log(clickBot.subscribers);
