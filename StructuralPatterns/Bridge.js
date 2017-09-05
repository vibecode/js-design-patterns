// The Bridge pattern allows two components, a client and a service, to work together with each component having its own interface.

// The Adapter and Bridge patterns have some common attributes.
// Both promote flexibility by providing a level of indirection to another object.
// Both involve forwarding requests to this object from an interface other than its own.
// The key difference between these patterns lies in their intents.

// Adapter focuses on resolving incompatibilities between two existing interfaces.
// It doesn't focus on how those interfaces are implemented, nor does it consider how they might evolve independently.
// It's a way of making two independently designed classes work together without reimplementing one or the other.
//
// Bridge, on the other hand, bridges an abstraction and its (potentially numerous) implementations.
// It provides a stable interface to clients even as it lets you vary the classes that implement it.
// It also accommodates new implementations as the system evolves.

// As a result of these differences, Adapter and Bridge are often used at different points in the software lifecycle.
// An adapter often becomes necessary when you discover that two incompatible classes should work together, generally to avoid replicating code.
// The coupling is unforeseen.
//
// In contrast, the user of a bridge understands up-front that an abstraction must have several implementations, and both may evolve independently.

// The Adapter pattern makes things work after they're designed;
// Bridge makes them work before they are.
//
// That doesn't mean Adapter is somehow inferior to Bridge;
// each pattern merely addresses a different problem.


//input devices
class Gestures {
  constructor(output) {
    this.output = output;
  }

  tap() {
    this.output.click();
  }

  swipe() {
    this.output.move();
  }

  pan() {
    this.output.drag();
  }

  pinch() {
    this.output.zoom();
  }
}

class Mouse {
  constructor(output) {
    this.output = output;
  }

  click() {
    this.output.click();
  }

  move() {
    this.output.move();
  }

  down() {
    this.output.down();
  }

  wheel() {
    this.output.zoom()
  }
}

//output devices
class Screen {
  click() {
    console.log('Show ripple');
  }

  move() {
    console.log('Show moving');
  }

  drag() {
    console.log('Show dragging')
  }

  zoom() {
    console.log('Show zoom in');
  }
}

class Audio {
  click() {
    console.log('Sound click');
  }

  move() {
    console.log('Sound waves');
  }

  drag() {
    console.log('Sound screetch')
  }

  zoom() {
    console.log('Volume up');
  }
}

const screen = new Screen();
const audio = new Audio();

const mouse = new Mouse(screen);
const touchScreen = new Gestures(screen);

const mouseToAudio = new Mouse(audio);

mouse.click();
touchScreen.tap();

mouseToAudio.click();