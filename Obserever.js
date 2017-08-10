//pros: application modules decoupling
//cons: potentially unexpected updates and sequencing issues.

//****************************
// Stoyan Stefanov version
//****************************

const publisher = {
  subscribers: {
    any: []
  },
  subscribe: function (fn, type) {
    type = type || 'any';
    if (typeof this.subscribers[type] === 'undefined') {
      this.subscribers[type] = [];
    }
    this.subscribers[type].push(fn);
  },
  unsubscribe: function(fn, type) {
    this.visitSubscribers('unsubscribe', fn, type);
  },
  publish: function (publication, type) {
    this.visitSubscribers('publish', publication, type)
  },
  visitSubscribers: function(action, arg, type) {
    let pubtype = type || 'any',
        subscribers = this.subscribers[pubtype];
    subscribers.forEach((subscriber, i) => {
      if (action === 'publish') {
        subscriber(arg);
      } else {
        if (subscriber === arg) {
          subscribers.splice(i, 1);
        }
      }
    });
  }
};

//adds publisher methods to object
function makePublisher(obj) {
  for (let i in publisher) {
    if (publisher.hasOwnProperty(i) && typeof publisher[i] === 'function') {
      obj[i] = publisher[i];
    }
  }
  obj.subscribers = { any: [] };
}

const paper = {
  daily: function() {
    this.publish('big news today');
  },
  monthly: function() {
   this.publish('intresting analysis', "monthly");
  }
};

makePublisher(paper);

const joe = {
  drinkCoffee: function(paper) {
    console.log('Just read ' + paper);
  },
  sundayPreNap: function(monthly) {
    console.log('about to fall asleep reading this ' + monthly);
  }
};

paper.subscribe(joe.drinkCoffee);
paper.subscribe(joe.sundayPreNap, 'monthly');

paper.daily();
paper.daily();
paper.daily();
paper.monthly();

