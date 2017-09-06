// Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.

// The Command pattern encapsulates actions as objects.
// Command objects allow for loosely coupled systems by separating the objects that issue a request from the objects that actually process the request.
// These requests are called events and the code that processes the requests are called event handlers.

// Use the Command pattern when you want to:
//   • parameterize objects by an action to perform. You can express such parameterization in a procedural language with a callback function, that is, a function that’s registered somewhere to be called at a later point. Commands are an object-oriented replacement for callbacks.
//   • specify, queue, and execute requests at different times. A Command object can have a lifetime independent of the original request. If the receiver of a request can be represented in an address space-independent way, then you can transfer a command object for the request to a different process and fulfill the request there.
//   • support undo. The Command’s Execute operation can store state for reversing its effects in the command itself. The Command interface must have an added Unexecute operation that reverses the effects of a previous call to Execute. Executed commands are stored in a history list. Unlimited-level undo and redo is achieved by traversing this list backwards and forwards calling Unexecute and Execute, respectively.
//  • support logging changes so that they can be reapplied in case of a system crash. By augmenting the Command interface with load and store operations, you can keep a persistent log of changes. Recovering from a crash involves reloading logged commands from disk and reexecuting them with the Execute operation.
//  • structure a system around high-level operations built on primitives operations. Such a structure is common in information systems that support transactions. A transaction encapsulates a set of changes to data. The Command pattern offers a way to model transactions. Commands have a common interface, letting you invoke all transactions the same way. The pattern also makes it easy to extend the system with new transactions.

// Participants
//
// • Command – declares an interface for executing an operation.
// • ConcreteCommand (PasteCommand, OpenCommand)
//    – defines a binding between a Receiver object and an action.
//    – implements Execute by invoking the corresponding operation(s) on Receiver.
// • Client (Application) – creates a ConcreteCommand object and sets its receiver.
// • Invoker (Menu Item) – asks the command to carry out the request.
// • Receiver (Document, Application) – knows how to perform the operations associated with carrying out a request. Any class may serve as a Receiver.


// A generic example would be you ordering a food at restaurant. You (i.e. Client) ask the waiter (i.e. Invoker) to bring some food (i.e. Command) and waiter simply forwards the request to Chef (i.e. Receiver) who has the knowledge of what and how to cook. Another example would be you (i.e. Client) switching on (i.e. Command) the television (i.e. Receiver) using a remote control (Invoker).

//Commands
class Play {
  constructor(receiver) {
    this.receiver = receiver;
  }

  execute() {
    this.receiver.play();
  }

  undo() {
    this.receiver.stop();
  }
}

class Record {
  constructor(receiver) {
    this.receiver = receiver;
  }

  execute() {
    this.receiver.record();
  }

  undo() {
    this.receiver.stop();
  }
}

//Receiver
class Project {
  play() {
    console.log(`Playing audio`);
  }

  record() {
    console.log(`Recording audio`);
  }

  stop() {
    console.log(`Stopped`);
  }
}

//Invoker
class Menu {
  toggle(command) {
    command.execute();
  }

  untoggle(command) {
    command.undo();
  }
}

//client

const project = new Project();

const play = new Play(project);
const record = new Record(project);

const menu = new Menu();

menu.toggle(play);
menu.toggle(record);
menu.untoggle(record);
